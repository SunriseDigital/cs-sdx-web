<%@ Control Language="C#" AutoEventWireup="true" CodeFile="head.ascx.cs" Inherits="Sdx.WebLib.Control.Scaffold.Head" %>

<link rel="stylesheet" href="<%=Sdx.Util.Path.AutoMin("/lib/package/bootstrap/3.3.6/css/bootstrap.min.css") %>">
<link rel="stylesheet" href="<%=Sdx.Util.Path.AutoMin("/lib/package/fontawesome/4.6.1/css/font-awesome.min.css") %>">
<link rel="stylesheet" href="<%=Sdx.Util.Path.AutoMin("/lib/css/scaffold.min.css") %>">
<script type="text/uri-list" data-role="chain-loader-list">
  <%=Sdx.Util.Path.AutoMin("/lib/package/jquery/2.2.3/jquery.min.js") %>
</script>

<script type="text/uri-list" data-role="chain-loader-list">
  <%=Sdx.Util.Path.AutoMin("/lib/js/scaffold.min.js") %>
</script>
<script type="text/javascript" src="<%=Sdx.Util.Path.AutoMin("/lib/js/static/chain-loader.min.js") %>" async></script>