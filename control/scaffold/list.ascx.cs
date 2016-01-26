using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _sdx_Control_Scaffold_list : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
      var scaffold = Sdx.Web.Scaffold.Instance(this.Name);
      Sdx.Context.Current.Debug.Log(scaffold);
    }

    public string Name { get; set; }
}