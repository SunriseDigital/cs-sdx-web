<%@ Control Language="C#" AutoEventWireup="true" CodeFile="list.ascx.cs" Inherits="Sdx.WebLib.Control.Scaffold.List" %>

<div><%= scaffold.Title %>リスト</div>
<ul>
<% foreach(Sdx.Db.Record record in scaffold.List){ %>
   <li>
     <% foreach(Dictionary<string, string> data in scaffold.ListColumns){ %>
     <div>
        <%= record.GetString(data["column"]) %>
     </div>
     <% } %>
   </li>
<% } %>
</ul>