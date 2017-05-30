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


      record = this.Scaffold.LoadRecord(Request.Params, Scaffold.Db.SharedConnection);
      this.form = this.Scaffold.BuildForm(record, Scaffold.Db.SharedConnection);
      if (Request.Form.Count > 0)
      {
        Scaffold.BindToForm(form, Request.Form);
        if (form.ExecValidators())
        {
          using (Scaffold.Db.SharedConnection.BeginTransaction())
          {
            try
            {
              Scaffold.Save(record, form.ToNameValueCollection(), Scaffold.Db.SharedConnection);
              Scaffold.Db.SharedConnection.Commit();
            }
            catch (Exception e)
            {
              Scaffold.Db.SharedConnection.Rollback();
              record.DisposeOnRollback();
              if (Sdx.Context.Current.IsDebugMode)
              {
                throw;
              }
              this.saveException = e;
            }
          }

          if (!Sdx.Context.Current.IsDebugMode && this.saveException == null)
          {
            Response.Redirect(Scaffold.ListPageUrl.Build());
          }
        }
      }

    }

    public string Name { get; set; }

    public int? OutlineRank { get; set; }
  }
}