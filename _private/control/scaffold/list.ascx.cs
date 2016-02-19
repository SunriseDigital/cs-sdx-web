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

    protected void Page_Load(object sender, EventArgs e)
    {
      this.scaffold = Sdx.Scaffold.Manager.CurrentInstance(this.Name);

      this.scaffold.ListPageUrl = new Web.Url(Request.Url.PathAndQuery);
      if (this.scaffold.EditPageUrl == null)
      {
        this.scaffold.EditPageUrl = new Web.Url(Request.Url.PathAndQuery);
      }

      using (var conn = scaffold.Db.CreateConnection())
      {
        conn.Open();
        
        if (scaffold.Group != null)
        {
          scaffold.Group.Init();
          groupSelector = scaffold.Group.BuildSelector(conn);
        }

        this.recordSet = scaffold.FetchRecordSet(conn);
      }
    }

    public string Name { get; set; }
  }
}
