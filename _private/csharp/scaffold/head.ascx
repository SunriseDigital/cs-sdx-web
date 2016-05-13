<%@ Control Language="C#" AutoEventWireup="true" CodeFile="head.ascx.cs" Inherits="Sdx.WebLib.Control.Scaffold.Head" %>

<link rel="stylesheet" href="<%=Sdx.Util.Path.AutoMin(BasePath + "/package/bootstrap/3.3.6/css/bootstrap.min.css") %>">
<link rel="stylesheet" href="<%=Sdx.Util.Path.AutoMin(BasePath + "/package/fontawesome/4.6.1/css/font-awesome.min.css") %>">
<link rel="stylesheet" href="<%=Sdx.Util.Path.AutoMin(BasePath + "/package/jquery-file-upload/9.12.3/css/jquery.fileupload.min.css") %>">
<link rel="stylesheet" href="<%=Sdx.Util.Path.AutoMin(BasePath + "/css/scaffold.min.css") %>">
<script type="text/uri-list" data-role="chain-loader-list">
  <%=Sdx.Util.Path.AutoMin(BasePath + "/package/jquery/2.2.3/jquery.min.js") %>
</script>

<script type="text/uri-list" data-role="chain-loader-list">
  /sdx/package/jquery-ui/1.11.4/jquery-ui.min.js
</script>

<script type="text/uri-list" data-role="chain-loader-list">
  /sdx/package/jquery-file-upload/9.12.3/js/jquery.iframe-transport.js
  /sdx/package/jquery-file-upload/9.12.3/js/jquery.fileupload.js
</script>

<script type="text/uri-list" data-role="chain-loader-list">
  <%=Sdx.Util.Path.AutoMin(BasePath + "/js/scaffold.min.js") %>
</script>
<script type="text/javascript" src="<%=Sdx.Util.Path.AutoMin(BasePath + "/js/static/chain-loader.min.js") %>" async></script>