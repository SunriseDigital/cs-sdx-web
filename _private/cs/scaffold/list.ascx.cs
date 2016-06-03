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
    protected Sdx.Html.PagerLink pagerLink;

    protected void Page_Load(object sender, EventArgs e)
    {
      if (OutlineRank != null)
      {
        Scaffold.OutlineRank = (int)OutlineRank;
      }
      
      try
      {
        if (Scaffold.EditPageUrl == null)
        {
          Scaffold.EditPageUrl = new Web.Url(Request.Url.PathAndQuery);
        }

        if (Scaffold.Group != null)
        {
          Scaffold.Group.Init();
          groupSelector = Scaffold.Group.BuildSelector(Scaffold.Db.SharedConnection);
        }

        var deleteQuery = Request.QueryString["delete"];
        if (deleteQuery != null)
        {
          Scaffold.Db.SharedConnection.BeginTransaction();
          try
          {
            Scaffold.DeleteRecord(deleteQuery, Scaffold.Db.SharedConnection);
            Scaffold.Db.SharedConnection.Commit();
          }
          catch (Exception)
          {
            Scaffold.Db.SharedConnection.Rollback();
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

        this.recordSet = Scaffold.FetchRecordSet(Scaffold.Db.SharedConnection, pager);

        var sortingSubmit = Request.Form["submit_sorting_order"];
        if (sortingSubmit != null)
        {
          Scaffold.Db.SharedConnection.BeginTransaction();
          try
          {
            Scaffold.Sort(recordSet, Request.Form.GetValues("pkeys"), Scaffold.Db.SharedConnection);
            Scaffold.Db.SharedConnection.Commit();
          }
          catch (Exception)
          {
            Scaffold.Db.SharedConnection.Rollback();
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
        throw;
      }
    }

    public string Name { get; set; }

    public int? OutlineRank { get; set; }
  }
}
