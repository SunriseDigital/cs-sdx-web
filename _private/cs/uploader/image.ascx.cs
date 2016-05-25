using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Sdx.WebLib.Control.Uploader
{
  public partial class Image : System.Web.UI.UserControl
  {
    public int? MaxWidth { get; set; }

    public int? MaxHeight { get; set; }

    public int? MinWidth { get; set; }

    public int? MinHeight { get; set; }

    public string UploadWebPath { get; set; }

    private bool scaleDown = true;
    public bool ScaleDown { get { return scaleDown; } set { scaleDown = value; } }

    private bool scaleUp = false;
    public bool ScaleUp { get { return scaleUp; } set { scaleUp = value; } }

    private List<string> allowedContentTypes = new List<string> {"image/jpeg", "image/png" };
    public List<string> AllowedContentTypes { get { return allowedContentTypes; } }

    protected void Page_Load(object sender, EventArgs e)
    {
      Sdx.Context.Current.PreventDebugDisplay = true;

      var formName = Request.Params["name"];
      var response = new Dictionary<string, List<Dictionary<string, string>>>();
      response["files"] = new List<Dictionary<string, string>>();
      for (int i = 0; i < Request.Files.Count; i++)
      {
        if (formName != Request.Files.GetKey(i))
        {
          continue;
        }

        var fileData = new Dictionary<string, string>();
        var postedFile = Request.Files.Get(i);
        ProcessPostedFile(postedFile, fileData);

        response["files"].Add(fileData);


      }

      Sdx.Web.Helper.JsonResponse(response);
    }

    private void ProcessPostedFile(HttpPostedFile postedFile, Dictionary<string, string> fileData)
    {
      fileData["name"] = postedFile.FileName;

      if(!postedFile.ContentType.StartsWith("image/"))
      {
        fileData["error"] = Sdx.I18n.GetString("画像ではありません。");
        return;
      }

      if (AllowedContentTypes.Count > 0 && !AllowedContentTypes.Contains(postedFile.ContentType))
      {
        fileData["error"] = Sdx.I18n.GetString("不正な画像形式です。");
        return;
      }

      using (var image = System.Drawing.Image.FromStream(postedFile.InputStream))
      using (var minCheckedImage = HandleMin(image, fileData))
      using (var checkedImage = HandleMax(minCheckedImage, fileData))
      {
        if(checkedImage != null)
        {
          var localFullPath = Page.MapPath(UploadWebPath + postedFile.FileName);
          checkedImage.Save(localFullPath);
          fileData["path"] = Sdx.Util.Path.MapWebPath(localFullPath);
          fileData["width"] = checkedImage.Width.ToString();
          fileData["height"] = checkedImage.Height.ToString();
        }
      }
    }

    private System.Drawing.Image HandleMax(System.Drawing.Image image, Dictionary<string, string> fileData)
    {
      if (image == null)
      {
        return null;
      }

      //最低の指定があった
      if (MaxWidth != null || MaxHeight != null)
      {
        var tooBig = (MaxWidth != null && image.Width > MaxWidth) || (MaxHeight != null && image.Height > MaxHeight);
        if (tooBig)
        {
          //拡大してOK
          if (scaleDown)
          {
            var scaledImage = Sdx.Util.Image.ScaleDown(image, MaxWidth, MaxHeight);
            if (scaledImage != null)
            {
              image.Dispose();
              return scaledImage;
            }
          }
          else
          {
            //拡大はしない
            if (MaxWidth == null)
            {
              fileData["error"] = Sdx.I18n.GetString("縦{0}px以下の画像をアップロードしてください。", MaxWidth);
            }
            else if (MaxHeight == null)
            {
              fileData["error"] = Sdx.I18n.GetString("横{0}px以下の画像をアップロードしてください。", MaxHeight);
            }
            else
            {
              fileData["error"] = Sdx.I18n.GetString("縦{0}px/横{1}px以下の画像をアップロードしてください。", MaxHeight, MaxWidth);
            }

            return null;
          }
        }
      }

      return image;
    }

    private System.Drawing.Image HandleMin(System.Drawing.Image image, Dictionary<string, string> fileData)
    {
      if(image == null)
      {
        return null;
      }

      //最低の指定があった
      if (MinWidth != null || MinHeight != null)
      {
        var tooSmall = (MinWidth != null && image.Width < MinWidth) || (MinHeight != null && image.Height < MinHeight);
        if (tooSmall)
        {
          //拡大してOK
          if (scaleUp)
          {
            var scaledImage = Sdx.Util.Image.ScaleUp(image, MinWidth, MinHeight);
            if (scaledImage != null)
            {
              image.Dispose();
              return scaledImage;
            }
          }
          else
          {
            //拡大はしない
            if (MinWidth == null)
            {
              fileData["error"] = Sdx.I18n.GetString("縦{0}px以上の画像をアップロードしてください。", MinHeight);
            }
            else if (MinHeight == null)
            {
              fileData["error"] = Sdx.I18n.GetString("横{0}px以上の画像をアップロードしてください。", MinWidth);
            }
            else
            {
              fileData["error"] = Sdx.I18n.GetString("縦{0}px/横{1}px以上の画像をアップロードしてください。", MinHeight, MinWidth);
            }

            return null;
          }
        }
      }

      return image;
    }
  }
}
