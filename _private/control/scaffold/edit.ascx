<%@ Control Language="C#" AutoEventWireup="true" CodeFile="edit.ascx.cs" Inherits="Sdx.WebLib.Control.Scaffold.Edit" %>

<div><%if(scaffold.Group != null && scaffold.Group.TargetValue != null){ %><%=scaffold.Group.Name %> <%} %><%=scaffold.Title %></div>

<div>
  <form action="<%=Request.Url.PathAndQuery %>" method="post">
    <%foreach(var elem in form){ %>
      <%if (elem is Sdx.Html.InputHidden){ %>
        <%=elem.Tag.Render(Sdx.Html.Attr.Create().AddClass("form-control")) %>
      <% }else{ %>
        <div class="form-group">
          <label><%=elem.Label %></label>
          <%if(elem is Sdx.Html.CheckableGroup){ %>
            <%elem.Tag.ForEach(child =>{%>
            <div class="<%= child.Children.First().Attr["type"]%>">
              <%=child.Render() %>
            </div>
            <%}); %>
          <%} else { %>
            <%=elem.Tag.Render(Sdx.Html.Attr.Create().AddClass("form-control")) %>
          <%} %>
          <%if(elem.IsSecret){ %>
            <p class="notice"><i class="fa fa-exclamation-triangle"></i> 現在の値は表示されません。空送信時は更新されませんのでご注意ください。</p>
          <%} %>
          <%if (elem.HasError){ %>
          <ul>
            <% foreach(var error in elem.Errors){ %>
            <li><%=error %></li>
            <%} %>
          </ul>
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
