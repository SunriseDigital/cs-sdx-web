using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
namespace Sdx.WebLib.Control.Scaffold
{
  public partial class Head : System.Web.UI.UserControl
  {
    protected void Page_Load(object sender, EventArgs e)
    {
      if(BasePath == null)
      {
        BasePath = "/sdx";
      }
    }

    public string BasePath { get; set; }
  }
}
