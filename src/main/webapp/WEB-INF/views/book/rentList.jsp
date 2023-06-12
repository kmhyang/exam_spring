<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>도서별 대여매출현황</title>
<style>
#container {
	width: 900px;
	margin: 0 auto;
}
h2, th {
	text-align: center;
}
.no {text-align: center;}
.text{text-align: left;}
.number {text-align: right;}

table {
	width: 500px;
}
</style>
</head>
<body>
	<div id="container">
		<h2>도서별 대여매출현황</h2>
		<table>
			<thead>
				<tr>
					<th>도서번호</th>
					<th>도서명</th>
					<th>대여총계</th>
					<th>대여횟수</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${rentList}" var="list">
					<tr>
						<td class="no">${list.bookNo}</td>
						<td class="text">${list.bookName}</td>
						<!-- <td class="number"><fmt:formatNumber value="${list.rentTotalPrice}" pattern="#,###" /></td> -->
						<td class="number"><fmt:formatNumber value="${list.rentTotalPrice}" type="number" maxFractionDigits="3" /></td>
						<td class="number">${list.rentCount}</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</div>
</body>
</html>