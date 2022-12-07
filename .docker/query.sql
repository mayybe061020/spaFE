INSERT INTO sbeauty.role (id, name)
VALUES (1, 'admin');
INSERT INTO sbeauty.role (id, name)
VALUES (2, 'manager');
INSERT INTO sbeauty.role (id, name)
VALUES (3, 'sale_staff');
INSERT INTO sbeauty.role (id, name)
VALUES (4, 'technical_staff');

INSERT INTO sbeauty.users (id, address, date_of_birth, email, gender, name, password, phone, url_image)
VALUES (1, 'admin', null, 'admin@sys.com', 'male', 'admin',
        '$2a$10$rSthjIBp1UxJXUADzTXe..TqX544AwEEI.EG5aZgipMD0EM6GeNhO', '0123456789', null);
INSERT INTO sbeauty.users (id, address, date_of_birth, email, gender, name, password, phone, url_image)
VALUES (2, 'p603 building 1B, 78 Giải Pho', '2001-03-02T17:00:00.000Z', 'manager@sys.com', 'male', 'manager account',
        '$2a$10$GNHp78yPs5y0YIJNWEbFweyDCeh96lAAU/t/7BUaivgz0hMRQB60u', '0123512323', 'd9071dccff.jpg');
INSERT INTO sbeauty.users (id, address, date_of_birth, email, gender, name, password, phone, url_image)
VALUES (3, 'p603 building 1B, 78 Giải Pho', '2000-02-04T17:00:00.000Z', 'manager1@sys.com', 'male',
        'manager account 2', '$2a$10$q/wR3q/8ntHhlz7E0Mfo8uj4dXFqklucXwI4IASlWAGVBbvtvPCh.', '0551231232',
        'Doraemon.jpg');

INSERT INTO sbeauty.user_role (user_id, role_id)
VALUES (1, 1);
INSERT INTO sbeauty.user_role (user_id, role_id)
VALUES (2, 2);
INSERT INTO sbeauty.user_role (user_id, role_id)
VALUES (3, 2);


insert into slot (name, timeline)
values ('Slot 1', '09:00 - 10:30'),
       ('Slot 2', '10:30 - 12:00'),
       ('Slot 3', '13:30 - 15:00'),
       ('Slot 4', '15:00 - 16:30'),
       ('Slot 5', '16:30 - 18:00');

insert into spa_bed (name)
values ('Giường 1'),
       ('Giường 2'),
       ('Giường 3'),
       ('Giường 4');

insert into slot_branch_mapping (id_branch, id_slot)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (1, 4),
       (1, 5);

insert into bed_branch_mapping (id_branch, id_spa_bed)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (1, 4);

INSERT INTO sbeauty.supplier (id, address, description, email, name, phone, tax_code)
VALUES (1, 'Ngõ 78 Giải Phóng Hanoi
603 Nhà 1B', '12fas', 'do.hoangnam9x@gmail.com', 'Hanoi computer', '0123512789', '1231231231');
INSERT INTO sbeauty.supplier (id, address, description, email, name, phone, tax_code)
VALUES (2, 'p603 building 1B, 78 Giải Pho', '25124123123', 'gearvn@sys.com', 'GearVN', '0651212323', '5617134213');


INSERT INTO sbeauty.product (id, description, discount_end, discount_percent, discount_start, dose, image, name, price,
                             unit)
VALUES (1, 'thuoc giam dau', null, 0, null, 200, null, 'Insulint', 300000, 'g');
INSERT INTO sbeauty.product (id, description, discount_end, discount_percent, discount_start, dose, image, name, price,
                             unit)
VALUES (2, 'Thuoc giam sot', null, 0, null, 200, null, 'paracetamol', 145000, 'g');
INSERT INTO sbeauty.product (id, description, discount_end, discount_percent, discount_start, dose, image, name, price,
                             unit)
VALUES (3, 'dau day', null, 0, null, 1, null, 'kim tiem', 50000, 'cai');

INSERT INTO sbeauty.product_supplier_mapping (id, id_product, id_supplier)
VALUES (1, 1, 1);
INSERT INTO sbeauty.product_supplier_mapping (id, id_product, id_supplier)
VALUES (2, 2, 2);
INSERT INTO sbeauty.product_supplier_mapping (id, id_product, id_supplier)
VALUES (3, 3, 1);

INSERT INTO sbeauty.service (id, description, discount_end, discount_percent, discount_start, duration, image, name,
                             price)
VALUES (1, 'giau dau cuc nhanh', null, null, null, 50, null, 'sieu giam dau', 400000);
INSERT INTO sbeauty.service (id, description, discount_end, discount_percent, discount_start, duration, image, name,
                             price)
VALUES (2, 'cuc nhanh', '2022-12-22T17:00:00.000Z', 5, '2022-12-01T17:00:00.000Z', 20, null, 'sieu ha sot', 99000);

INSERT INTO sbeauty.service_product_mapping (id, product_usage, product_id, service_id)
VALUES (1, 5, 1, 1);
INSERT INTO sbeauty.service_product_mapping (id, product_usage, product_id, service_id)
VALUES (2, 5, 2, 2);
INSERT INTO sbeauty.service_product_mapping (id, product_usage, product_id, service_id)
VALUES (3, 2, 3, 2);
