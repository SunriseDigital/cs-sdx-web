<%@ Control Language="C#" AutoEventWireup="true" CodeFile="list.ascx.cs" Inherits="Sdx.WebLib.Control.Scaffold.List" %>

<div id="sdx-scaffold-list">
  <%if (groupSelector != null){ %>
  <div><%=groupSelector.Tag.Render(Sdx.Html.Attr.Create().AddClass("form-control group-selector")) %></div>
  <%} %>
  <div><%if(scaffold.Group != null && scaffold.Group.TargetValue != null){ %><%=scaffold.Group.Name %> <%} %><%= scaffold.Title %>リスト</div>
  <div><a class="btn btn-primary" href="<%=scaffold.EditPageUrl.Build() %>">新規追加</a></div>
  <ul>
  <% foreach(Sdx.Db.Record record in recordSet){ %>
     <li>
       <% foreach(var data in scaffold.DisplayList){ %>
       <div>
          <%= record.GetString(data["column"]) %>
       </div>
       <% } %>
       <div>
         <a href="<%=scaffold.EditPageUrl.Build(new Dictionary<string, string> { {"id", record.GetString("id")} })%>">編集</a>
       </div>
     </li>
  <% } %>
  </ul>
</div>