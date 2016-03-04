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

        this.recordSet = scaffold.FetchRecordSet(conn);
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
