-- Krijo databazën nëse nuk ekziston
IF DB_ID('EmployeeManagementDB') IS NULL
BEGIN
    CREATE DATABASE EmployeeManagementDB;
END
GO

-- Përdor databazën
USE EmployeeManagementDB;
GO

-- Fshij tabelat nëse ekzistojnë për të evituar konfliktet
IF OBJECT_ID('dbo.LeaveRequests', 'U') IS NOT NULL DROP TABLE dbo.LeaveRequests;
IF OBJECT_ID('dbo.Employees', 'U') IS NOT NULL DROP TABLE dbo.Employees;
IF OBJECT_ID('dbo.Departments', 'U') IS NOT NULL DROP TABLE dbo.Departments;
IF OBJECT_ID('dbo.Roles', 'U') IS NOT NULL DROP TABLE dbo.Roles;
IF OBJECT_ID('dbo.Reports', 'U') IS NOT NULL DROP TABLE dbo.Reports;
GO

-- Tabela Departments
CREATE TABLE Departments (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL
);
GO

-- Tabela Roles
CREATE TABLE Roles (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL
);
GO

-- Tabela Employees
CREATE TABLE Employees (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(20),
    HireDate DATE NOT NULL,
    DepartmentId INT,
    Salary DECIMAL(18,2),
    RoleId INT,
    FOREIGN KEY (DepartmentId) REFERENCES Departments(Id),
    FOREIGN KEY (RoleId) REFERENCES Roles(Id)
);
GO

-- Tabela LeaveRequests
CREATE TABLE LeaveRequests (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    EmployeeId INT NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    Reason NVARCHAR(255),
    Status NVARCHAR(50) DEFAULT 'Pending',
    FOREIGN KEY (EmployeeId) REFERENCES Employees(Id)
);
GO

-- Tabela Reports
CREATE TABLE Reports (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ReportType NVARCHAR(100) NOT NULL, -- p.sh. "Attendance", "Leave", "Performance"
    GeneratedDate DATETIME DEFAULT GETDATE(),
    Data NVARCHAR(MAX) -- mund të ruash JSON ose tekst raporti
);
GO
