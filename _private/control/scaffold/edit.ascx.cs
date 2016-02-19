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

      if (scaffold.Group != null)
      {
        scaffold.Group.Init();
      }

      using(var conn = scaffold.Db.CreateConnection())
      {
        conn.Open();
        var record = this.scaffold.LoadRecord(Request.Params, conn);
        this.form = this.scaffold.BuildForm(record, conn);

        form.Bind(record.ToNameValueCollection());

        if (Request.Form.Count > 0)
        {
          form.Bind(Request.Form);
          if (form.ExecValidators())
          {
            conn.BeginTransaction();
            try
            {
              scaffold.Save(record, Request.Form, conn);
              conn.Commit();
            }
            catch (Exception ex)
            {
              conn.Rollback();
              throw ex;
            }

            if (!Sdx.Context.Current.IsDebugMode)
            {
              Response.Redirect(scaffold.ListPageUrl.Build());
            }
          }
        }

        Sdx.Context.Current.Debug.Log(record);
      }

    }

    public string Name { get; set; }
  }
}