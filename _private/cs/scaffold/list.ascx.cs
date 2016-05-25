using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
namespace Sdx.WebLib.Cs.Scaffold
{
  public partial class List : System.Web.UI.UserControl
  {
    public Sdx.Scaffold.Manager Scaffold { get; set; }
    protected dynamic recordSet;
    protected Sdx.Html.Select groupSelector;
    protected Sdx.Db.Connection conn;
    protected Sdx.Html.PagerLink pagerLink;

    protected void Page_Load(object sender, EventArgs e)
    {
      if (OutlineRank != null)
      {
        Scaffold.OutlineRank = (int)OutlineRank;
      }
      
      conn = Scaffold.Db.CreateConnection();
      try
      {
        conn.Open();

        if (Scaffold.EditPageUrl == null)
        {
          Scaffold.EditPageUrl = new Web.Url(Request.Url.PathAndQuery);
        }

        if (Scaffold.Group != null)
        {
          Scaffold.Group.Init();
          groupSelector = Scaffold.Group.BuildSelector(conn);
        }

        var deleteQuery = Request.QueryString["delete"];
        if (deleteQuery != null)
        {
          conn.BeginTransaction();
          try
          {
            Scaffold.DeleteRecord(deleteQuery, conn);
            conn.Commit();
          }
          catch (Exception)
          {
            conn.Rollback();
            throw;
          }

          if (!Sdx.Context.Current.IsDebugMode)
          {
            Response.Redirect(Scaffold.ListPageUrl.Build(new String[] { "delete" }));
          }
        }

        Sdx.Pager pager = null;
        if(Scaffold.HasPerPage)
        {
          pager = new Sdx.Pager();
          pager.PerPage = Scaffold.PerPage;
          pagerLink = new Sdx.Html.PagerLink(pager, Scaffold.ListPageUrl);
        }

        this.recordSet = Scaffold.FetchRecordSet(conn, pager);

        var sortingSubmit = Request.Form["submit_sorting_order"];
        if (sortingSubmit != null)
        {
          conn.BeginTransaction();
          try
          {
            Scaffold.Sort(recordSet, Request.Form.GetValues("pkeys"), conn);
            conn.Commit();
          }
          catch (Exception)
          {
            conn.Rollback();
            throw;
          }

          if (!Sdx.Context.Current.IsDebugMode)
          {
            Response.Redirect(Scaffold.ListPageUrl.Build());
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
      if (this.conn != null)
      {
        this.conn.Dispose();
      }
      
      base.OnUnload(e);
    }

    public string Name { get; set; }

    public int? OutlineRank { get; set; }
  }
}
