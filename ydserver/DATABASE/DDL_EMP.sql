-- DROP TABLE emp_tbl_01;
CREATE TABLE emp_tbl_01
AS
    SELECT employee_id, last_name, email, hire_date, job_id, department_id
    FROM employees;

    
ALTER TABLE emp_tbl_01
ADD PRIMARY KEY (employee_id) ;

ALTER TABLE emp_tbl_01
MODIFY hire_date DATE DEFAULT sysdate;
