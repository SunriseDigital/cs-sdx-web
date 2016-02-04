<%@ Control Language="C#" AutoEventWireup="true" CodeFile="edit.ascx.cs" Inherits="Sdx.WebLib.Control.Scaffold.Edit" %>

<div><%=scaffold.Title %></div>

<div>
  <form action="<%=Request.Url.PathAndQuery %>" method="post">
    <%foreach(var elem in form){ %>
      <%if (elem is Sdx.Html.InputHidden){ %>
        <%=elem.Tag.Render(Sdx.Html.Attr.Create().AddClass("form-control")) %>
      <% }else{ %>
        <div class="form-group">
          <label><%=elem.Label %></label>
          <%=elem.Tag.Render(Sdx.Html.Attr.Create().AddClass("form-control")) %>
        </div>
      <%} %>
    <%} %>
    <div class="row">
      <div class="col-xs-4">
        <a class="btn btn-default" href="<%=scaffold.ReturnUrl.Build() %>">戻る</a>
      </div>
      <div class="col-xs-4 text-center">
        <input type="submit" name="submit" value="保存" class="btn btn-danger">
      </div>
      <div class="col-xs-4">&nbsp;</div>
    </div>
  </form>

</div>
