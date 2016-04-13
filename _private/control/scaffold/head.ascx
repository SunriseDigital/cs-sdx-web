<%@ Control Language="C#" AutoEventWireup="true" CodeFile="head.ascx.cs" Inherits="Sdx.WebLib.Control.Scaffold.Head" %>

<link rel="stylesheet" href="<%=Sdx.Util.Path.AutoMin("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css") %>">
<link rel="stylesheet" href="<%=Sdx.Util.Path.AutoMin("https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css") %>">
<link rel="stylesheet" href="<%=Sdx.Util.Path.AutoMin("/lib/css/scaffold.min.css") %>">

<script type="text/uri-list" data-role="chain-loader-list">
  <%=Sdx.Util.Path.AutoMin("https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js") %>
  <%=Sdx.Util.Path.AutoMin("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment.min.js") %>
</script>

<%--<script type="text/uri-list" data-role="chain-loader-list">
  <%=Sdx.Util.Path.AutoMin("/lib/js/bower/bootstrap/dist/js/bootstrap.min.js") %>
  /lib/js/bower/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js
</script>--%>

<script type="text/uri-list" data-role="chain-loader-list">
  <%=Sdx.Util.Path.AutoMin("/lib/js/scaffold.min.js") %>
</script>

<script type="text/javascript" src="<%=Sdx.Util.Path.AutoMin("/lib/js/static/chain-loader.min.js") %>" async defer></script>