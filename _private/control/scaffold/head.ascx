<%@ Control Language="C#" AutoEventWireup="true" CodeFile="head.ascx.cs" Inherits="Sdx.WebLib.Control.Scaffold.Head" %>

<link rel="stylesheet" href="<%=Sdx.Util.Path.AutoMin("/lib/js/bower/bootstrap/dist/css/bootstrap.min.css") %>">
<link rel="stylesheet" href="<%=Sdx.Util.Path.AutoMin("/lib/js/bower/font-awesome/css/font-awesome.min.css") %>">
<link rel="stylesheet" href="<%=Sdx.Util.Path.AutoMin("/lib/css/scaffold.min.css") %>">

<script>
  function init() {
    Sdx.require([
      [
        "<%=Sdx.Util.Path.AutoMin("/lib/js/bower/jquery/dist/jquery.min.js") %>",
        "/lib/js/bower/moment/min/moment.min.js"
      ],
      [
        "<%=Sdx.Util.Path.AutoMin("/lib/js/bower/bootstrap/dist/js/bootstrap.min.js") %>",
        "/lib/js/bower/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"
      ],
      ["<%=Sdx.Util.Path.AutoMin("/lib/js/scaffold.min.js") %>"]
    ]);
  }
</script>
<script type="text/javascript" src="<%=Sdx.Util.Path.AutoMin("/lib/js/require.min.js") %>" async defer onload="init()"></script>

