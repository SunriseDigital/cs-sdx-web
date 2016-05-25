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
    public Sdx.Scaffold.Manager Scaffold { get; set; }
    protected Sdx.Html.Form form;
    protected Sdx.Db.Record record;
    protected Exception saveException;

    protected void Page_Load(object sender, EventArgs ev)
    {
      if (OutlineRank != null)
      {
        Scaffold.OutlineRank = (int)OutlineRank;
      }

      this.Scaffold.EditPageUrl = new Web.Url(Request.Url.PathAndQuery);
      if (this.Scaffold.ListPageUrl == null)
      {
        this.Scaffold.ListPageUrl = new Web.Url(Request.Url.PathAndQuery);
      }

      if (Scaffold.Group != null)
      {
        Scaffold.Group.Init();
      }

      using(var conn = Scaffold.Db.CreateConnection())
      {
        conn.Open();
        record = this.Scaffold.LoadRecord(Request.Params, conn);
        this.form = this.Scaffold.BuildForm(record, conn);

        if (Request.Form.Count > 0)
        {
          Scaffold.BindToForm(form, Request.Form);
          if (form.ExecValidators())
          {
            conn.BeginTransaction();
            try
            {
              Scaffold.Save(record, form.ToNameValueCollection(), conn);
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
              Response.Redirect(Scaffold.ListPageUrl.Build());
            }
          }
        }
      }

    }

    public string Name { get; set; }

    public int? OutlineRank { get; set; }
  }
}