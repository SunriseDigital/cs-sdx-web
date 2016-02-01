<%@ Control Language="C#" AutoEventWireup="true" CodeFile="edit.ascx.cs" Inherits="Sdx.WebLib.Control.Scaffold.Edit" %>

<div><%=scaffold.Title %></div>

<div>
  <form action="<%=Request.Url.PathAndQuery %>" method="post">
    <%foreach(var item in scaffold.BuildFormItems()){ %>
    <div class="form-group">
      <label><%=item.Label %></label>
      <%=item.CreateElement().Tag.Render(Sdx.Html.Attr.Create().AddClass("form-control")) %>
    </div>
    <%} %>
    <div>
      <input type="submit" name="submit" value="保存" class="btn btn-danger">
    </div>
  </form>

</div>
