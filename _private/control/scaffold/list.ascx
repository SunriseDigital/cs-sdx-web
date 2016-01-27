<%@ Control Language="C#" AutoEventWireup="true" CodeFile="list.ascx.cs" Inherits="Sdx.WebLib.Control.Scaffold.List" %>

<div>list</div>
<ul>
<% scaffold.List.ForEach((Action<Sdx.Db.Record>)((record) =>{ %>
   <li><%= record.GetString("name") %></li>
<% })); %>
</ul>