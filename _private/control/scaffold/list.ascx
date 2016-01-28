<%@ Control Language="C#" AutoEventWireup="true" CodeFile="list.ascx.cs" Inherits="Sdx.WebLib.Control.Scaffold.List" %>

<div><%= scaffold.Title %>リスト</div>
<ul>
<% foreach(var record in scaffold.RecordSet){ %>
   <li>
     <% foreach(var data in scaffold.ListColumns){ %>
     <div>
        <%= record.GetString(data["column"]) %>
     </div>
     <% } %>
   </li>
<% } %>
</ul>