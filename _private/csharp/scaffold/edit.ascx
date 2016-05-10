<%@ Control Language="C#" AutoEventWireup="true" CodeFile="edit.ascx.cs" Inherits="Sdx.WebLib.Control.Scaffold.Edit" %>
<div>
  <<%=scaffold.Heading(1) %>>
    <%if(scaffold.Group != null && scaffold.Group.TargetValue != null){ %><%=scaffold.Group.Name %> <%} %><%=scaffold.Title %><%=record.IsNew ? "登録" : "編集" %>
  </<%=scaffold.Heading(1) %>>
  <form action="<%=Request.Url.PathAndQuery %>" method="post">
    <%if (saveException != null){ %>
    <div>
      <div class="alert alert-danger" role="alert">
        <p><i class="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp;<%=Sdx.I18n.GetString("保存時にシステムエラーが発生しました。") %></p>
        <p class="clearfix">
          <i class="fa fa-quote-left " aria-hidden="true"></i>
          <%=saveException.Message %>
          <i class="fa fa-quote-right " aria-hidden="true"></i>
        </p>
        <p class="text-right"><a href="<%=scaffold.EditPageUrl.Build() %>"><i class="fa fa-refresh" aria-hidden="true"></i>&nbsp;<%=Sdx.I18n.GetString("再読み込み") %></a></p>
      </div>
    </div>
    <%} %>
    <%foreach(var config in scaffold.FormList){
        var elem = form[config["column"].ToString()];
    %>
      <%if (elem is Sdx.Html.InputHidden){ %>
        <%=elem.Tag.Render() %>
      <% }else{ %>
        <div class="form-group<%if (elem.HasError){%> has-error<%}else if(elem.IsSecret){%> has-warning<%} %>">
          <<%=scaffold.Heading(2) %>>
            <%=elem.Label %><%if(!elem.IsAllowEmpty){%>&nbsp;<span class="label label-warning"><%=Sdx.I18n.GetString("必須") %></span><%} %>
          </<%=scaffold.Heading(2) %>>
          <%if(elem is Sdx.Html.CheckableGroup){ %>
            <%elem.Tag.ForEach(child =>{%>
            <div class="<%= child.Children.First().Attr["type"]%>">
              <%=child.Render() %>
            </div>
            <%}); %>
          <%} else if(elem is Sdx.Html.ImageUploader){ %>
            <%=elem.Tag.ChildrenCall(children => children.First(tag => tag.Attr.HasClass("btn")).Attr.AddClass("btn-default")).Render() %>
          <%} else { %>
            <%=elem.Tag.Render(Sdx.Html.Attr.Create().AddClass("form-control")) %>
          <%} %>
          <%if(elem.IsSecret){ %>
            <p class="notice"><i class="fa fa-exclamation-triangle"></i> <%=Sdx.I18n.GetString("現在の値は表示されません。空送信時は更新されませんのでご注意ください。") %></p>
          <%} %>
          <%if(config.ContainsKey("autoCurrentCheckbox")){
              var checkbox = form[config["autoCurrentCheckbox"].ToString()];
          %>
            <%=checkbox.Tag.Render("checkbox", "auto-current") %>
          <%} %>
          <%if (elem.HasError){ %>
            <%=elem.Errors.Html().Render() %>
          <%} %>
        </div>
      <%} %>
    <%} %>
    <div class="row">
      <div class="col-xs-4">
        <a class="btn btn-default" href="<%=scaffold.ListPageUrl.Build() %>">戻る</a>
      </div>
      <div class="col-xs-4 text-center">
        <input type="submit" name="submit" value="保存" class="btn btn-danger">
      </div>
      <div class="col-xs-4">&nbsp;</div>
    </div>
  </form>

</div>
