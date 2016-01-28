<%@ Control Language="C#" AutoEventWireup="true" CodeFile="list.ascx.cs" Inherits="Sdx.WebLib.Control.Scaffold.List" %>

<div><%= scaffold.Title %>リスト</div>
<ul>
<% foreach(Sdx.Db.Record record in scaffold.RecordSet){ %>
   <li>
     <% foreach(Sdx.Collection.Holder data in scaffold.ListColumns){ %>
     <div>
        <%= record.GetString(data.As<string>("hoge")) %>
     </div>
     <% } %>
   </li>
<% } %>
</ul>