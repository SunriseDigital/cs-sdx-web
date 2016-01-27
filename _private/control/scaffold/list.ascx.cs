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
    protected Sdx.Web.Scaffold scaffold;

    protected void Page_Load(object sender, EventArgs e)
    {
      this.scaffold = Sdx.Web.Scaffold.Instance(this.Name);
    }

    public string Name { get; set; }
  }
}
