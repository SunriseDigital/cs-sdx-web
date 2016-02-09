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
    protected Sdx.Html.Form form;

    protected void Page_Load(object sender, EventArgs e)
    {
      this.scaffold = Sdx.Scaffold.Manager.CurrentInstance(this.Name);
      this.scaffold.EditPageUrl = new Web.Url(Request.Url.PathAndQuery);
      if (this.scaffold.ListPageUrl == null)
      {
        this.scaffold.ListPageUrl = new Web.Url(Request.Url.PathAndQuery);
      }

      scaffold.InitGroup();

      this.form = this.scaffold.BuildForm();
      var record = this.scaffold.LoadRecord(Request.Params);

      form.Bind(record.ToNameValueCollection());

      if (Request.Form.Count > 0)
      {
        form.Bind(Request.Form);
        if (form.ExecValidators())
        {
          record.Bind(Request.Form);
          using (var conn = scaffold.Db.CreateConnection())
          {
            conn.Open();
            conn.BeginTransaction();
            conn.Save(record);
            conn.Commit();
          }

          if(!Sdx.Context.Current.IsDebugMode)
          {
            Response.Redirect(scaffold.ListPageUrl.Build());
          }
        }
      }

      Sdx.Context.Current.Debug.Log(record);
    }

    public string Name { get; set; }
  }
}