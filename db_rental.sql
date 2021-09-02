CREATE DATABASE[db_rental]
GO
/****** Object:  Table [dbo].[tb_brand]    Script Date: 01/09/2021 13:42:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_brand](
	[id] [int] NOT NULL,
	[name] [varchar](255) NOT NULL,
	[description] [ntext] NOT NULL,
 CONSTRAINT [PK_TB_BRAND] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_customer]    Script Date: 01/09/2021 13:42:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_customer](
	[id] [int] NOT NULL,
	[id_number] [varchar](255) NOT NULL,
	[name] [varchar](255) NOT NULL,
	[telephone] [varchar](255) NOT NULL,
	[address] [varchar](255) NOT NULL,
	[handphone] [varchar](255) NOT NULL,
	[email] [varchar](255) NOT NULL,
 CONSTRAINT [PK_TB_CUSTOMER] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_motor]    Script Date: 01/09/2021 13:42:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_motor](
	[id] [int] NOT NULL,
	[police_number] [varchar](255) NOT NULL,
	[vehicle_type_id] [int] NOT NULL,
	[year_build] [int] NOT NULL,
	[year_operated] [int] NOT NULL,
	[fuel_type] [varchar](255) NOT NULL,
	[owner_name] [varchar](255) NOT NULL,
 CONSTRAINT [PK_TB_MOTOR] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_rental]    Script Date: 01/09/2021 13:42:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_rental](
	[id] [int] NOT NULL,
	[transaction_number] [varchar](255) NOT NULL,
	[transaction_date] [datetime] NOT NULL,
	[users_id] [int] NOT NULL,
	[customer_id] [int] NOT NULL,
	[motor_id] [int] NOT NULL,
	[rent_duration] [int] NOT NULL,
	[price] [float] NOT NULL,
 CONSTRAINT [PK_TB_RENTAL] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_users]    Script Date: 01/09/2021 13:42:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_users](
	[id] [int] NOT NULL,
	[name] [varchar](255) NOT NULL,
	[email] [varchar](255) NOT NULL,
	[password] [varchar](255) NOT NULL,
	[username] [varchar](255) NOT NULL,
 CONSTRAINT [PK_TB_USERS] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_vehicle_type]    Script Date: 01/09/2021 13:42:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_vehicle_type](
	[id] [int] NOT NULL,
	[brand_id] [int] NOT NULL,
	[name] [varchar](255) NOT NULL,
	[description] [ntext] NOT NULL,
	[price] [float] NOT NULL,
 CONSTRAINT [PK_TB_VEHICLE_TYPE] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[tb_motor]  WITH CHECK ADD  CONSTRAINT [tb_motor_fk0] FOREIGN KEY([vehicle_type_id])
REFERENCES [dbo].[tb_vehicle_type] ([id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[tb_motor] CHECK CONSTRAINT [tb_motor_fk0]
GO
ALTER TABLE [dbo].[tb_rental]  WITH CHECK ADD  CONSTRAINT [tb_rental_fk0] FOREIGN KEY([users_id])
REFERENCES [dbo].[tb_users] ([id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[tb_rental] CHECK CONSTRAINT [tb_rental_fk0]
GO
ALTER TABLE [dbo].[tb_rental]  WITH CHECK ADD  CONSTRAINT [tb_rental_fk1] FOREIGN KEY([customer_id])
REFERENCES [dbo].[tb_customer] ([id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[tb_rental] CHECK CONSTRAINT [tb_rental_fk1]
GO
ALTER TABLE [dbo].[tb_rental]  WITH CHECK ADD  CONSTRAINT [tb_rental_fk2] FOREIGN KEY([motor_id])
REFERENCES [dbo].[tb_motor] ([id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[tb_rental] CHECK CONSTRAINT [tb_rental_fk2]
GO
ALTER TABLE [dbo].[tb_vehicle_type]  WITH CHECK ADD  CONSTRAINT [tb_vehicle_type_fk0] FOREIGN KEY([brand_id])
REFERENCES [dbo].[tb_brand] ([id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[tb_vehicle_type] CHECK CONSTRAINT [tb_vehicle_type_fk0]
GO
