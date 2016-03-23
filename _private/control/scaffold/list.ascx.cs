using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
namespace Sdx.WebLib.Control.Scaffold
{
  public partial class List : System.Web.UI.UserControl
  {
    protected Sdx.Scaffold.Manager scaffold;
    protected dynamic recordSet;
    protected Sdx.Html.Select groupSelector;
    protected Sdx.Db.Connection conn;

    protected void Page_Load(object sender, EventArgs e)
    {
      scaffold = Sdx.Scaffold.Manager.CurrentInstance(this.Name);
      conn = scaffold.Db.CreateConnection();
      try
      {
        conn.Open();

        scaffold.ListPageUrl = new Web.Url(Request.Url.PathAndQuery);
        if (scaffold.EditPageUrl == null)
        {
          scaffold.EditPageUrl = new Web.Url(Request.Url.PathAndQuery);
        }

        if (scaffold.Group != null)
        {
          scaffold.Group.Init();
          groupSelector = scaffold.Group.BuildSelector(conn);
        }

        var deleteQuery = Request.QueryString["delete"];
        if (deleteQuery != null)
        {
          var pkeyValues = Sdx.Util.Json.Decode(Request.QueryString["delete"]);
          if (pkeyValues != null)
          {
            conn.BeginTransaction();
            try
            {
              scaffold.DeleteRecord(pkeyValues, conn);
              conn.Commit();
            }
            catch (Exception)
            {
              conn.Rollback();
              throw;
            }

            if (!Sdx.Context.Current.IsDebugMode)
            {
              Response.Redirect(scaffold.ListPageUrl.Build(new String[]{"delete"}));
            }
          }
        }

        this.recordSet = scaffold.FetchRecordSet(conn);

        var sortingSubmit = Request.Form["submit_sorting_order"];
        if (sortingSubmit != null)
        {
          conn.BeginTransaction();
          try
          {
            scaffold.Sort(recordSet, Request.Form.GetValues("pkeys"), conn);
            conn.Commit();
          }
          catch (Exception)
          {
            conn.Rollback();
            throw;
          }

          if (!Sdx.Context.Current.IsDebugMode)
          {
            Response.Redirect(scaffold.ListPageUrl.Build());
          }
        }
      }
      catch (Exception)
      {
        conn.Dispose();
        throw;
      }
    }

    protected override void OnUnload(EventArgs e)
    {
      this.conn.Dispose();
      base.OnUnload(e);
    }

    public string Name { get; set; }
  }
}
