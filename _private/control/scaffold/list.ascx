<%@ Control Language="C#" AutoEventWireup="true" CodeFile="list.ascx.cs" Inherits="Sdx.WebLib.Control.Scaffold.List" %>

<div class="sdx-scaffold-list">
  <%if (groupSelector != null){ %>
  <div class="form-group">
    <%=groupSelector.Tag.Render(Sdx.Html.Attr.Create().AddClass("form-control group-selector")) %>
  </div>
  <%} %>
  <h1><%if(scaffold.Group != null && scaffold.Group.TargetValue != null){ %><%=scaffold.Group.Name %> <%} %><%= scaffold.Title %>リスト</h1>
  
  <form action="<%=Request.Url.PathAndQuery %>" method="post">
    <div class="form-group">
      <a class="btn btn-primary" href="<%=scaffold.EditPageUrl.Build() %>">新規追加</a>
    </div>
    <div class="form-group text-right">
      <input class="btn btn-success" type="submit" name="submit_sorting_order" value="並び順を保存" />
    </div>
    <ul class="resplist resplist-striped">
    <% foreach(Sdx.Db.Record record in recordSet){ %>
      <li class="resplist-row list-row">
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
            <%if(!scaffold.SortingOrder.IsEmpty){ %>
            <div class="btn-group">
              <button class="btn btn-default sort up" data-sort-type="top"><i class="fa fa-step-backward fa-rotate-90"></i></button>
              <button class="btn btn-default sort up" data-sort-type="up"><i class="fa fa-chevron-up"></i></button>
              <button class="btn btn-default sort down" data-sort-type="down"><i class="fa fa-chevron-down"></i></button>
              <button class="btn btn-default sort down" data-sort-type="bottom"><i class="fa fa-step-backward fa-rotate-270"></i></button>
            </div>
            <%} %>
            <button class="btn btn-danger delete"><i class="fa fa-times"></i></button>
          </div>
        </div>
        <input type="hidden" name="pkeys" value="<%= HttpUtility.HtmlEncode(Sdx.Util.Json.Encoder(record.GetPkeyValues()))%>" />
      </li>
    <% } %>
    </ul>
    <div class="form-group text-right">
      <input class="btn btn-success" type="submit" name="submit_sorting_order" value="並び順を保存" />
    </div>
    <%if(pagerLink != null){ %>
    <div class="clearfix">
      <div class="pull-left">
        <%= pagerLink.GetPrev("前へ").Render(a => a.AddClass("btn", "btn-default")) %>
      </div>
      <div class="pull-right">
        <%= pagerLink.GetNext("次へ").Render(a => a.AddClass("btn", "btn-default")) %>
      </div>
    </div>
    <%} %>
  </form>
</div>

<input type="hidden" name="DeleteMessage" value="削除します。よろしいですか？">