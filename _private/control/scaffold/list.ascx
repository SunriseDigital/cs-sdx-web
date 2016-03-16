<%@ Control Language="C#" AutoEventWireup="true" CodeFile="list.ascx.cs" Inherits="Sdx.WebLib.Control.Scaffold.List" %>

<div class="sdx-scaffold-list">
  <%if (groupSelector != null){ %>
  <div class="form-group">
    <%=groupSelector.Tag.Render(Sdx.Html.Attr.Create().AddClass("form-control group-selector")) %>
  </div>
  <%} %>
  <h1><%if(scaffold.Group != null && scaffold.Group.TargetValue != null){ %><%=scaffold.Group.Name %> <%} %><%= scaffold.Title %>リスト</h1>
  <div class="form-group">
    <a class="btn btn-primary" href="<%=scaffold.EditPageUrl.Build() %>">新規追加</a>
  </div>
  <ul class="resplist resplist-striped">
  <% foreach(Sdx.Db.Record record in recordSet){ %>
    <li class="resplist-row list-item" data-pkeys="<%= HttpUtility.HtmlEncode(Sdx.Util.Json.Encoder(record.GetPkeyValues()))%>">
      <div class="resplist-items">
        <% foreach(var item in scaffold.DisplayList){ %>
        <div class="resplist-item">
          <div class="resplist-label"<%if (item.ContainsKey("style")){ %> style="<%= item["style"] %>"<%;} %>><%= item["label"] %></div>
          <div class="resplist-value"><%= item.Display(record, conn) %></div>
        </div>
        <% } %>
      </div>
      <div class="resplist-footer clearfix">
        <div class="pull-right">
          <a class="btn btn-primary" href="<%=scaffold.EditPageUrl.Build(new Dictionary<string, string> { {"id", record.GetString("id")} })%>">編集</a>
          <div class="btn-group">
            <button class="btn btn-default up-button"><i class="fa fa-chevron-up"></i></button>
            <button class="btn btn-default down-button"><i class="fa fa-chevron-down"></i></button>
          </div>
          <button class="btn btn-danger delete"><i class="fa fa-times"></i></button>
        </div>
      </div>
    </li>
  <% } %>
  </ul>
</div>

<input type="hidden" name="DeleteMessage" value="削除します。よろしいですか？">