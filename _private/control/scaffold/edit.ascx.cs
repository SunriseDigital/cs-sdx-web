using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Sdx.WebLib.Control.Scaffold
{
  public partial class Edit : System.Web.UI.UserControl
  {
    protected Sdx.Scaffold.Manager scaffold;

    protected void Page_Load(object sender, EventArgs e)
    {
      this.scaffold = Sdx.Scaffold.Manager.CurrentInstance(this.Name);

      var form = this.scaffold.BuildForm();

      if (Request.Form.Count > 0)
      {
        form.Bind(Request.Form);
        if (form.ExecValidators())
        {
          Sdx.Context.Current.Debug.Log("Is Valid !!");
        }
      }
    }

    public string Name { get; set; }
  }
}