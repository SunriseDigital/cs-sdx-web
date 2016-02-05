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
      this.scaffold.ListPage = new Web.Url(Request.Url.PathAndQuery);
      if(this.scaffold.EditPage == null)
      {
        this.scaffold.EditPage = new Web.Url(Request.Url.PathAndQuery);
      }

      this.recordSet = scaffold.FetchRecordSet((select) =>
      {
        if (scaffold.Group != null)
        {
          scaffold.Group.TargetValue = Request.QueryString[scaffold.Group.TargetColumnName];
          if(scaffold.Group.TargetValue != null)
          {
            select.Where.Add(scaffold.Group.TargetColumnName, scaffold.Group.TargetValue);
          }
        }

        return true;
      });
    }

    public string Name { get; set; }
  }
}
