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
    protected Sdx.Db.Record record;
    protected Exception saveException;

    protected void Page_Load(object sender, EventArgs ev)
    {
      this.scaffold = Sdx.Scaffold.Manager.CurrentInstance(this.Name);
      if (OutlineRank != null)
      {
        scaffold.OutlineRank = (int)OutlineRank;
      }

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
        record = this.scaffold.LoadRecord(Request.Params, conn);
        this.form = this.scaffold.BuildForm(record, conn);

        if (Request.Form.Count > 0)
        {
          scaffold.BindToForm(form, Request.Form);
          if (form.ExecValidators())
          {
            conn.BeginTransaction();
            try
            {
              scaffold.Save(record, form.ToNameValueCollection(), conn);
              conn.Commit();
            }
            catch (Exception e)
            {
              conn.Rollback();
              record.DisposeOnRollback();
              if (Sdx.Context.Current.IsDebugMode)
              {
                throw;
              }
              this.saveException = e;
            }

            if (!Sdx.Context.Current.IsDebugMode && this.saveException == null)
            {
              Response.Redirect(scaffold.ListPageUrl.Build());
            }
          }
        }
      }

    }

    public string Name { get; set; }

    public int? OutlineRank { get; set; }
  }
}