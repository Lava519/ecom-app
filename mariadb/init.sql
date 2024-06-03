USE shop;

CREATE TABLE IF NOT EXISTS Users ( UserID int NOT NULL AUTO_INCREMENT, FullName varchar(64), UserName varchar(32), Password varchar(128), Avatar varchar(32), Role varchar(32), PRIMARY KEY(UserID));
CREATE TABLE IF NOT EXISTS Products (ProductID int NOT NULL AUTO_INCREMENT,Image varchar(128), SellerID int NOT NULL, Name varchar(256), Description TEXT, Price int, PRIMARY KEY (ProductID), FOREIGN KEY (SellerID) REFERENCES Users(UserID));
CREATE TABLE IF NOT EXISTS Orders ( OrderID int NOT NULL AUTO_INCREMENT, BuyerID int NOT NULL, ProductID int NOT NULL, Quantity int NOT NULL, PRIMARY KEY (OrderID), FOREIGN KEY (BuyerID) REFERENCES Users(UserID), FOREIGN KEY (ProductID) REFERENCES Products(ProductID));
CREATE TABLE IF NOT EXISTS Cart ( CartID int NOT NULL AUTO_INCREMENT, UserID int NOT NULL, ProductID int NOT NULL, Quantity int NOT NULL, PRIMARY KEY(CartID), FOREIGN KEY (UserID) REFERENCES Users(UserID), FOREIGN KEY (ProductID) REFERENCES Products(ProductID));
