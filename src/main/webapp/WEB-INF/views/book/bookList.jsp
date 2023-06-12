<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>도서목록</title>
<style>
#container {
	width:900px;
	margin: 0 auto;
}
h2, th{
	text-align: center;
}

</style>
</head>
<body>
	<div id="container">
			<h2>도서목록조회/수정</h2>
		<table>
			<tr>
				<th>도서번호</th>
				<th>도서명</th>
				<th>표지</th>
				<th>출판일자</th>
				<th>금액</th>
				<th>출판사</th>
				<th>도서소개</th>
			</tr>
			<c:forEach items="${bookList}" var="list">
				<tr>
					<td>${list.bookNo}</td>
					<td>${list.bookName}</td>
					<td><img style="width: 100px;"
						src="<c:url value='/resources/images/${list.bookCoverimg}'/>"></td>
					<td><fmt:formatDate value="${list.bookDate}"
							pattern="yyyy/MM/dd" /></td>
					<td><fmt:formatNumber value="${list.bookPrice}"
							pattern="#,###" /></td>
					<td>${list.bookPublisher}</td>
					<td>${list.bookInfo}</td>
				</tr>
			</c:forEach>
		</table>
	</div>
</body>
</html>