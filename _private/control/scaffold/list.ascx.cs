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

    protected void Page_Load(object sender, EventArgs e)
    {
      this.scaffold = Sdx.Scaffold.Manager.CurrentInstance(this.Name);
      this.scaffold.ListPageUrl = new Web.Url(Request.Url.PathAndQuery);
      if(this.scaffold.EditPageUrl == null)
      {
        this.scaffold.EditPageUrl = new Web.Url(Request.Url.PathAndQuery);
      }

      scaffold.InitGroup();

      this.recordSet = scaffold.FetchRecordSet();
    }

    public string Name { get; set; }
  }
}
