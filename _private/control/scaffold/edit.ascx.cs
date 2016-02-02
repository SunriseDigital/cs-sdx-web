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
    protected dynamic scaffold;

    protected void Page_Load(object sender, EventArgs e)
    {
      dynamic instances = (dynamic)Sdx.Context.Current.Vars[Sdx.Scaffold.Manager<Sdx.Db.Record>.CONTEXT_KEY];
      this.scaffold = instances[this.Name];
    }

    public string Name { get; set; }
  }
}