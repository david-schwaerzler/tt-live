INSERT INTO ttlive.account VALUES (1, 'David', '792aec94757261853bfd692201dfa6e0ea51fd52255e29bacfbbb09f6d0f9ed4', 'user', 'schwaerzler.da@gmail.com', false, '2023-01-13 23:55:30.630897', '2023-01-13 23:55:30.631022');


--
-- Data for Name: game_style; Type: TABLE DATA; Schema: ttlive; Owner: ttlive
--

INSERT INTO ttlive.game_style VALUES (1, 'Bundessystem', '4er Mannschaft mit 2 Doppel und 8 Einzeln', 4, 2, 'D1-D1;D2-D2;1-2;2-1;3-4;4-3;1-1;2-2;3-3;4-4', 10, false);
INSERT INTO ttlive.game_style VALUES (2, 'Sechser-Paarkreuz-System', '6er Mannschaft mit 4 Doppel und 12 Einzel', 6, 3, 'D1-D2;D2-D1;D3-D3;1-2;2-1;3-4;4-3;5-6;6-5;1-1;2-2;3-3;4-4;5-5;6-6;D1-D1', 9, true);
INSERT INTO ttlive.game_style VALUES (3, 'Dietze-Paarkreuz-System', '4er Mannschaft mit 2 Doppel, 8 Einzel und 2 Schlussdoppel', 4, 2, 'D1-D2;D2-D1;1-2;2-1;3-4;4-3;1-1;2-2;3-3;4-4;D2-D2;D1-D1', 7, true);
INSERT INTO ttlive.game_style VALUES (4, 'Betriebssport (Hamburg)', '6er Mannschaft mit 6 Doppel (2 Doppel Runden) und 12 Einzel', 6, 3, 'D1-D1;D2-D3;D3-D2;1-1;2-2;3-3;4-4;5-5;6-6;D1-D2;D2-D1;D3-D3;1-2;2-1;3-4;4-3;5-6;6-5', 18, false);


--
-- Data for Name: region; Type: TABLE DATA; Schema: ttlive; Owner: ttlive
--

INSERT INTO ttlive.region VALUES (1, 'DTTB', 'DTTB');
INSERT INTO ttlive.region VALUES (2, 'BaTTV', 'Baden');
INSERT INTO ttlive.region VALUES (3, 'ByTTV', 'Bayern');
INSERT INTO ttlive.region VALUES (4, 'TTVB', 'Brandenburg');
INSERT INTO ttlive.region VALUES (5, 'FTTB', 'Bremen');
INSERT INTO ttlive.region VALUES (6, 'HaTTV', 'Hamburg');
INSERT INTO ttlive.region VALUES (7, 'HeTTV', 'Hessen');
INSERT INTO ttlive.region VALUES (8, 'TTVMV', 'Mecklenburg-Vorpommern');
INSERT INTO ttlive.region VALUES (9, 'TTVN', 'Niedersachsen');
INSERT INTO ttlive.region VALUES (10, 'PTTV', 'Pfalz');
INSERT INTO ttlive.region VALUES (11, 'RTTVR', 'Rheinland Rheinhessen');
INSERT INTO ttlive.region VALUES (12, 'STTB', 'Saarland');
INSERT INTO ttlive.region VALUES (13, 'TTVSA', 'Sachsen-Anhalt');
INSERT INTO ttlive.region VALUES (14, 'TTTV', 'Thüringen');
INSERT INTO ttlive.region VALUES (15, 'WTTV', 'NRW');
INSERT INTO ttlive.region VALUES (16, 'TTBW', 'Baden-Württemberg');
INSERT INTO ttlive.region VALUES (17, 'BSV HH', 'Betriebssport Hamburg');


--
-- Data for Name: league; Type: TABLE DATA; Schema: ttlive; Owner: ttlive
--

INSERT INTO ttlive.league VALUES (2, '1. Landesliga 1', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (3, '1. Landesliga 2', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (4, '2. Landesliga 1', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (5, '2. Landesliga 2', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (6, '1. Bezirksliga 1', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (7, '1. Bezirksliga 2', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (8, '1. Bezirksliga 3', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (9, '1. Bezirksliga 4', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (10, '2. Bezirksliga 1', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (11, '2. Bezirksliga 2', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (12, '2. Bezirksliga 3', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (13, '2. Bezirksliga 4', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (14, '1. Kreisliga 1', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (15, '1. Kreisliga 2', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (16, '1. Kreisliga 3', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (17, '1. Kreisliga 4', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (18, '2. Kreisliga 1', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (19, '2. Kreisliga 2', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (20, '2. Kreisliga 3', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (21, '2. Kreisliga 4', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (22, '2. Kreisliga 5', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (23, '3. Kreisliga 1', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (24, '3. Kreisliga 2', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (25, '3. Kreisliga 3', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (26, '3. Kreisliga 4', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (27, '4. Kreisliga 1', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (28, '4. Kreisliga 2', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (29, '4. Kreisliga 3', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (30, '4. Kreisliga 4', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (31, 'Hamburg Liga', 'WOMEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (32, '1. Landesliga', 'WOMEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (33, '2. Landesliga', 'WOMEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (34, '1. Bezirksliga', 'WOMEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (35, '2. Bezirksliga 1', 'WOMEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (36, '1. Kreisliga', 'WOMEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (37, 'Oberliga', 'WOMEN', 6, '2022-11-19 01:26:25.191394', '2022-11-19 01:26:25.191468');
INSERT INTO ttlive.league VALUES (39, 'Verbandsoberliga', 'MEN', 1, '2022-11-20 00:00:47.979222', '2022-11-20 00:00:47.979538');
INSERT INTO ttlive.league VALUES (40, 'Verbandsoberliga ', 'WOMEN', 6, '2022-12-03 13:48:40.612744', '2022-12-03 13:48:40.612865');
INSERT INTO ttlive.league VALUES (41, 'Verbandsoberliga ', 'WOMEN', 1, '2022-12-04 11:19:35.824006', '2022-12-04 11:19:35.824091');
INSERT INTO ttlive.league VALUES (1, 'Hamburg Liga', 'MEN', 6, '2022-11-18 15:15:14.870798', '2022-11-18 15:15:14.870798');
INSERT INTO ttlive.league VALUES (42, 'Verbandsoberliga', 'WOMEN', 1, '2022-12-10 13:16:17.317416', '2022-12-10 13:16:17.317449');
INSERT INTO ttlive.league VALUES (43, 'Oberliga', 'WOMEN', 1, '2023-01-14 13:56:48.380233', '2023-01-14 13:56:48.380717');


INSERT INTO ttlive.league(id, name, contest, region_id) VALUES (44, 'S-Klasse', 'MEN', 17);
INSERT INTO ttlive.league(id, name, contest, region_id) VALUES (45, 'Staffel A1', 'MEN', 17);
INSERT INTO ttlive.league(id, name, contest, region_id) VALUES (46, 'Staffel B1', 'MEN', 17);
INSERT INTO ttlive.league(id, name, contest, region_id) VALUES (47, 'Staffel B2', 'MEN', 17);
INSERT INTO ttlive.league(id, name, contest, region_id) VALUES (48, 'Staffel B3', 'MEN', 17);
INSERT INTO ttlive.league(id, name, contest, region_id) VALUES (49, 'Staffel C1', 'MEN', 17);
INSERT INTO ttlive.league(id, name, contest, region_id) VALUES (50, 'Staffel C2', 'MEN', 17);
INSERT INTO ttlive.league(id, name, contest, region_id) VALUES (51, 'Staffel C3', 'MEN', 17);
INSERT INTO ttlive.league(id, name, contest, region_id) VALUES (52, 'Staffel D1', 'MEN', 17);
INSERT INTO ttlive.league(id, name, contest, region_id) VALUES (53, 'Staffel D2', 'MEN', 17);
INSERT INTO ttlive.league(id, name, contest, region_id) VALUES (54, 'Staffel D3', 'MEN', 17);
INSERT INTO ttlive.league(id, name, contest, region_id) VALUES (55, 'Staffel D4', 'MEN', 17);
INSERT INTO ttlive.league(id, name, contest, region_id) VALUES (56, 'Staffel E1', 'MEN', 17);
INSERT INTO ttlive.league(id, name, contest, region_id) VALUES (57, 'Staffel E2', 'MEN', 17);



--
-- Data for Name: team; Type: TABLE DATA; Schema: ttlive; Owner: ttlive
--

INSERT INTO ttlive.team VALUES (1, 'Oberalster VfW', 3, 1, '2022-11-18 15:15:14.876579', '2022-11-18 15:15:14.876579');
INSERT INTO ttlive.team VALUES (2, 'TSV Sasel', 2, 1, '2022-11-18 15:15:14.876579', '2022-11-18 15:15:14.876579');
INSERT INTO ttlive.team VALUES (3, 'TTG 207 Ahrensb./Großhansd.', 2, 1, '2022-11-18 15:15:14.876579', '2022-11-18 15:15:14.876579');
INSERT INTO ttlive.team VALUES (4, 'TTSG Urania-Bramfeld', 2, 1, '2022-11-18 15:15:14.876579', '2022-11-18 15:15:14.876579');
INSERT INTO ttlive.team VALUES (5, 'Walddörfer SV', 1, 1, '2022-11-18 15:15:14.876579', '2022-11-18 15:15:14.876579');
INSERT INTO ttlive.team VALUES (6, 'Eimsbütteler TV', 1, 1, '2022-11-18 15:15:14.876579', '2022-11-18 15:15:14.876579');
INSERT INTO ttlive.team VALUES (7, 'VfL Börnsen', 1, 1, '2022-11-18 15:15:14.876579', '2022-11-18 15:15:14.876579');
INSERT INTO ttlive.team VALUES (8, 'TTC Neuenfelde', 1, 1, '2022-11-18 15:15:14.876579', '2022-11-18 15:15:14.876579');
INSERT INTO ttlive.team VALUES (9, 'TuS Germania Schnelsen', 2, 1, '2022-11-18 15:15:14.876579', '2022-11-18 15:15:14.876579');
INSERT INTO ttlive.team VALUES (10, 'TSV Sasel', 3, 1, '2022-11-18 15:15:14.876579', '2022-11-18 15:15:14.876579');
INSERT INTO ttlive.team VALUES (11, 'SG TTC GWR/TuS Osdorf', 1, 1, '2022-11-18 15:15:14.876579', '2022-11-18 15:15:14.876579');
INSERT INTO ttlive.team VALUES (12, 'Walddörfer SV', 2, 1, '2022-11-18 15:15:14.876579', '2022-11-18 15:15:14.876579');
INSERT INTO ttlive.team VALUES (13, 'Niendorfer TSV ', 1, 37, '2022-11-19 01:26:25.213351', '2022-11-19 01:26:25.213395');
INSERT INTO ttlive.team VALUES (14, 'TTSG Urania-Bramfeld ', 1, 37, '2022-11-19 01:26:25.217333', '2022-11-19 01:26:25.217379');
INSERT INTO ttlive.team VALUES (17, 'GW Harburg', 1, 39, '2022-11-20 00:00:48.037362', '2022-11-20 00:00:48.037421');
INSERT INTO ttlive.team VALUES (18, 'TTSG Urania-Bramfeld', 1, 39, '2022-11-20 00:00:48.041064', '2022-11-20 00:00:48.041108');
INSERT INTO ttlive.team VALUES (19, 'TTC Mölln', 1, 39, '2022-11-26 16:49:45.857542', '2022-11-26 16:49:45.859766');
INSERT INTO ttlive.team VALUES (20, 'SC Vorwärts/ Wacker Hamburg', 1, 4, '2022-12-02 18:54:15.412624', '2022-12-02 18:54:15.414235');
INSERT INTO ttlive.team VALUES (22, 'ETV', 2, 3, '2022-12-02 20:23:54.844635', '2022-12-02 20:23:54.844752');
INSERT INTO ttlive.team VALUES (23, 'TTSG Urania-Bramfeld', 3, 3, '2022-12-02 20:23:54.84641', '2022-12-02 20:23:54.846441');
INSERT INTO ttlive.team VALUES (24, 'Tesperhude', 1, 31, '2022-12-02 20:38:54.459009', '2022-12-02 20:38:54.459025');
INSERT INTO ttlive.team VALUES (25, 'urania', 3, 31, '2022-12-02 20:38:54.460283', '2022-12-02 20:38:54.460292');
INSERT INTO ttlive.team VALUES (21, 'TTSG Urania Bramfeld', 4, 4, '2022-12-02 18:54:15.445216', '2022-12-02 18:54:15.445293');
INSERT INTO ttlive.team VALUES (26, 'GW Harburg', 1, 40, '2022-12-03 13:48:40.619859', '2022-12-03 13:48:40.619899');
INSERT INTO ttlive.team VALUES (27, 'TTSG Urania-Bramfeld', 2, 40, '2022-12-03 13:48:40.622417', '2022-12-03 13:48:40.622454');
INSERT INTO ttlive.team VALUES (28, 'TH Eilbeck', 1, 39, '2022-12-04 10:11:02.747363', '2022-12-04 10:11:02.749918');
INSERT INTO ttlive.team VALUES (30, 'TTSG Urania-Bramfeld', 2, 41, '2022-12-04 11:19:35.830834', '2022-12-04 11:19:35.830842');
INSERT INTO ttlive.team VALUES (29, 'TSV Schwarzenbek', 2, 41, '2022-12-04 11:19:35.829733', '2022-12-04 11:19:35.829754');
INSERT INTO ttlive.team VALUES (32, 'TTSG Urania-Bramfeld', 2, 42, '2022-12-10 13:16:17.337978', '2022-12-10 13:16:17.338017');
INSERT INTO ttlive.team VALUES (33, 'FC Voran Ohe', 1, 42, '2022-12-10 13:16:17.347341', '2022-12-10 13:16:17.347373');
INSERT INTO ttlive.team VALUES (35, 'Rostock Süd', 1, 43, '2023-01-14 13:56:48.409457', '2023-01-14 13:56:48.409496');
INSERT INTO ttlive.team VALUES (37, 'TTSG Urania-Bramfeld', 1, 43, '2023-01-14 14:27:09.208836', '2023-01-14 14:27:09.208866');
INSERT INTO ttlive.team VALUES (38, 'TTC Finow Eberswalde', 1, 43, '2023-01-15 09:55:38.345427', '2023-01-15 09:55:38.345794');
INSERT INTO ttlive.team VALUES (39, 'SC Poppenbüttel', 3, 40, '2023-01-15 10:46:17.806903', '2023-01-15 10:46:17.806932');
INSERT INTO ttlive.team VALUES (40, 'TTSG Urania-Bramfeld', 3, 31, '2023-01-26 19:09:39.347042', '2023-01-26 19:09:39.347097');
INSERT INTO ttlive.team VALUES (41, 'WTB/ Eilbeck', 2, 31, '2023-01-26 19:09:39.400886', '2023-01-26 19:09:39.400919');
INSERT INTO ttlive.team VALUES (42, 'Kaltenkirchener TS', 1, 40, '2023-02-11 12:38:07.020155', '2023-02-11 12:38:07.020234');
INSERT INTO ttlive.team VALUES (43, 'SV Siek', 3, 39, '2023-02-12 09:27:46.859243', '2023-02-12 09:27:46.859473');
INSERT INTO ttlive.team VALUES (44, 'Niendorfer TSV 2', 2, 41, '2023-02-12 13:49:27.769852', '2023-02-12 13:49:27.769893');


--
-- Data for Name: match; Type: TABLE DATA; Schema: ttlive; Owner: ttlive
--

INSERT INTO ttlive.match VALUES (16, '', '', 7, 3, 'ip4kxw', 'vz5it4', 'FINISHED', '2023-01-15 11:00:00', 43, 38, 37, 1, NULL, '2023-01-15 09:55:38.393398', '2023-01-15 14:07:19.961227');
INSERT INTO ttlive.match VALUES (20, '', '', 10, 0, 'el0omh', 'gy1acu', 'FINISHED', '2023-02-12 11:30:00', 39, 18, 43, 1, NULL, '2023-02-12 09:27:46.911238', '2023-02-13 22:01:51.745476');
INSERT INTO ttlive.match VALUES (10, '', '', 6, 4, '2hg35a', 'q1mljc', 'FINISHED', '2022-12-03 13:00:00', 40, 27, 26, 1, NULL, '2022-12-03 13:48:40.623711', '2022-12-03 16:32:28.4572');
INSERT INTO ttlive.match VALUES (19, '', '', 5, 5, '43ag0c', 'd5pz7x', 'FINISHED', '2023-02-11 15:00:00.123', 40, 42, 27, 1, NULL, '2023-02-11 12:38:07.108549', '2023-02-11 16:42:35.911832');
INSERT INTO ttlive.match VALUES (13, '', '', 6, 4, 'fpczh4', 'cfbj1v', 'FINISHED', '2022-12-10 11:00:00', 42, 32, 33, 1, NULL, '2022-12-10 09:03:57.979614', '2022-12-16 13:59:08.998281');
INSERT INTO ttlive.match VALUES (11, '', '', 7, 3, 'dioltz', 'mfide9', 'FINISHED', '2022-12-04 11:30:00', 39, 18, 28, 1, NULL, '2022-12-04 10:11:02.781065', '2022-12-17 14:32:03.799586');
INSERT INTO ttlive.match VALUES (7, '', '', 0, 9, 'e7m8im', 'xyktba', 'FINISHED', '2022-12-02 18:30:00', 3, 23, 22, 2, NULL, '2022-12-02 20:23:54.847053', '2022-12-02 22:08:07.127552');
INSERT INTO ttlive.match VALUES (18, '', '', 3, 7, 'pt3n38', 'gtbh1s', 'FINISHED', '2023-01-26 19:45:00', 31, 41, 40, 1, NULL, '2023-01-26 19:09:39.408441', '2023-01-26 22:01:46.797877');
INSERT INTO ttlive.match VALUES (5, '', '', 8, 2, 'bah9yx', 'wrf1lb', 'FINISHED', '2022-11-27 11:30:00', 39, 18, 19, 1, NULL, '2022-11-26 16:49:45.903389', '2022-11-27 13:52:05.778806');
INSERT INTO ttlive.match VALUES (17, '', '', 3, 7, '2oi8a9', 'we4t8e', 'FINISHED', '2023-01-14 14:00:00', 40, 27, 39, 1, NULL, '2023-01-15 10:46:17.814748', '2023-01-15 16:18:07.68735');
INSERT INTO ttlive.match VALUES (15, '', '', 4, 6, '71py75', '6w2nly', 'FINISHED', '2023-01-14 02:00:00', 43, 35, 37, 1, NULL, '2023-01-14 13:56:48.41678', '2023-01-14 16:27:40.871823');
INSERT INTO ttlive.match VALUES (12, '', '', 8, 2, 'dfnq2r', 'qutcjs', 'FINISHED', '2022-12-04 14:00:00', 41, 30, 29, 1, NULL, '2022-12-04 11:19:35.831403', '2022-12-04 16:26:57.314415');
INSERT INTO ttlive.match VALUES (9, '', '', 7, 9, 'gvt7ve', 'nfq5w6', 'FINISHED', '2022-12-02 18:30:00', 4, 21, 20, 2, NULL, '2022-12-03 12:57:23.425363', '2022-12-03 13:08:32.646119');
INSERT INTO ttlive.match VALUES (4, '', '', 8, 2, '6f7fkm', 'v1e3fr', 'FINISHED', '2022-11-20 11:30:00', 39, 18, 17, 1, NULL, '2022-11-20 00:00:48.048862', '2023-02-02 22:18:45.264482');
INSERT INTO ttlive.match VALUES (21, '', '', 6, 4, 'zyy2iv', 'qnpz31', 'FINISHED', '2023-02-12 15:00:00.841', 41, 44, 30, 1, NULL, '2023-02-12 13:49:27.774474', '2023-02-12 17:29:24.590357');


--
-- Data for Name: chat_message; Type: TABLE DATA; Schema: ttlive; Owner: ttlive
--

INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (1, 'Mannschaften sind eingetragen
Andresen beginnt ', 'David S.', NULL, 4, '2022-11-20 11:30:30.514578', false);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (2, 'Nervenbündel Schwärzler heute 😂', 'David S.', NULL, 4, '2022-11-20 12:35:26.552521', false);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (3, 'Andre 2:4 im 5teb', 'David S.', NULL, 4, '2022-11-20 12:36:30.714187', false);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (4, 'Andre im fünften', 'Marvin', NULL, 4, '2022-11-20 12:38:03.663054', false);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (5, 'Andre suverän 10:5 nach 1:4', 'David S.', NULL, 4, '2022-11-20 12:40:26.463633', false);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (7, 'Schwärzli betritt die Platte. Das Duell gegen Gote ist im Sommer 2:3 verloren gegangen, hoffentlich gibt es heute die Revanche', 'Evgenij', NULL, 4, '2022-11-20 12:57:06.278384', false);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (8, 'Wieder der 5. Satz bei David S…', 'Evgenij', NULL, 4, '2022-11-20 13:24:25.133032', false);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (10, 'Steffens Gegner trifft einfach alles gerade...', 'David S.', NULL, 5, '2022-11-27 12:48:35.161331', true);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (23, 'Manshi sehr stark ', 'David S.', NULL, 10, '2022-12-03 15:05:17.672502', true);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (24, 'Kommt Leute, bringt den Sieg nach Hause!', 'Evgenij', NULL, 10, '2022-12-03 16:17:15.339394', false);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (25, 'Starkes 6:4', 'David S.', NULL, 10, '2022-12-03 16:32:40.85717', true);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (26, 'Franzi suverän nach 0:2', 'David S.', NULL, 10, '2022-12-03 16:32:55.83771', true);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (27, 'Stegmann muss früher los, deshalb ziehen wir das letzte Spiel von ihm vor', 'David S.', NULL, 11, '2022-12-04 12:04:27.598616', true);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (28, 'Voll Glos jetzt, 5. Satz holen!', 'Evgenij', NULL, 11, '2022-12-04 12:24:37.680709', false);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (29, 'Ich glaub nach heute bin ich heißer, so wie ich rumgeschrien hab 😂', 'David S.', NULL, 11, '2022-12-04 13:46:15.448165', true);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (30, ' Stark Manshi ', 'David S.', NULL, 12, '2022-12-04 14:50:40.354215', true);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (31, 'Ich bin auch auf dem Weg, bin so in 15-20min da', 'David S.', NULL, 12, '2022-12-04 14:51:06.476929', true);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (32, '👍', 'David S.', NULL, 12, '2022-12-04 14:54:20.002344', true);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (33, 'Stark von euch beiden ', 'David S.', NULL, 12, '2022-12-04 15:00:02.273594', true);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (34, 'Anja hat''s nochmal stark gedreht ', 'David S.', NULL, 12, '2022-12-04 16:01:42.032176', true);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (35, 'Annika hat richtig stark gespielt ', 'David S.', NULL, 13, '2022-12-10 13:11:19.142198', true);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (37, 'Kommt, weiter kämpfen!🙏🏻', 'Evgenij', NULL, 16, '2023-01-15 12:20:44.377203', false);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (38, 'Auf geht''s. Ich will einen Underdog Sieg sehen 😂', 'David S.', NULL, 17, '2023-01-15 14:09:04.906458', false);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (39, 'Waren da 2 Sätze zu 0 dabei?', 'David S.', NULL, 17, '2023-01-15 14:38:25.475284', false);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (42, 'Wie ist das dopprl ausgegangen? Steht noch auf 10:8', 'David S.', NULL, 17, '2023-01-15 14:50:28.881572', false);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (43, 'Stark Svenja ', 'David S.', NULL, 17, '2023-01-15 15:25:01.275513', false);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (44, 'Das Auto hier rastet aus 😂', 'David S.', NULL, 17, '2023-01-15 15:25:13.010204', false);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (45, 'Auf Gehts! ', 'David&Manshi', NULL, 18, '2023-01-26 21:11:13.454791', false);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (46, 'Top', 'Sven', NULL, 18, '2023-01-26 22:14:39.594404', false);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (47, 'Stark ', 'David', NULL, 18, '2023-01-26 22:18:41.89293', false);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (48, 'hi', 'Maxim', NULL, 18, '2023-01-28 22:05:08.087487', false);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (49, 'Fehlt bei den Gegnern jemand?', 'David', NULL, 19, '2023-02-11 16:04:44.033052', false);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (50, 'Shit Steffen hat wieder versucht einen Netzroller zu bekommen.
Jetzt sind die probleme mit dem Rücken wieder da', 'David S.', NULL, 20, '2023-02-12 13:08:44.941157', true);
INSERT INTO ttlive.chat_message(id,	text, username,	 account_id, match_id, created_at, is_editor) VALUES (52, 'Schade. Trotzdem ne starke Leistung', 'David', NULL, 21, '2023-02-12 17:59:08.176145', false);


--
-- Data for Name: contact; Type: TABLE DATA; Schema: ttlive; Owner: ttlive
--



--
-- Data for Name: doubles; Type: TABLE DATA; Schema: ttlive; Owner: ttlive
--

INSERT INTO ttlive.doubles VALUES (47, 1, true, 'Andre', 'David S.', 11);
INSERT INTO ttlive.doubles VALUES (49, 2, true, 'David G.', 'Lutz', 11);
INSERT INTO ttlive.doubles VALUES (51, 1, true, 'Anja', 'Annika', 12);
INSERT INTO ttlive.doubles VALUES (13, 1, true, 'Andre', 'Steffen', 4);
INSERT INTO ttlive.doubles VALUES (15, 2, true, 'David', 'David', 4);
INSERT INTO ttlive.doubles VALUES (14, 1, false, 'Gote', 'Drücker', 4);
INSERT INTO ttlive.doubles VALUES (16, 2, false, 'Quedenfeldt', 'Hamann', 4);
INSERT INTO ttlive.doubles VALUES (17, 1, true, 'Andre', 'Steffen ', 5);
INSERT INTO ttlive.doubles VALUES (19, 2, true, 'David S.', 'Kosta', 5);
INSERT INTO ttlive.doubles VALUES (18, 1, false, 'Hofmann', 'Hoffmann', 5);
INSERT INTO ttlive.doubles VALUES (20, 2, false, 'Hauberg', 'Schneider ', 5);
INSERT INTO ttlive.doubles VALUES (53, 2, true, 'Manshi', 'Alina', 12);
INSERT INTO ttlive.doubles VALUES (52, 1, false, 'Carl', 'Gering', 12);
INSERT INTO ttlive.doubles VALUES (54, 2, false, 'Aye', 'Pfeiffer', 12);
INSERT INTO ttlive.doubles VALUES (48, 1, false, 'Brecker', 'Stegemann', 11);
INSERT INTO ttlive.doubles VALUES (50, 2, false, 'Do', 'Wieben', 11);
INSERT INTO ttlive.doubles VALUES (56, 1, false, 'Tanja Grzymek', 'Sophie Zeisberger', 13);
INSERT INTO ttlive.doubles VALUES (58, 2, false, 'Anna Maria Ochenkowski', 'Fabia Gisder', 13);
INSERT INTO ttlive.doubles VALUES (55, 1, true, 'Manshika Arora', 'Huong Ly Cao', 13);
INSERT INTO ttlive.doubles VALUES (27, 1, true, 'Hoffmann', 'Feddern', 7);
INSERT INTO ttlive.doubles VALUES (29, 2, true, 'Jansen', 'Ho', 7);
INSERT INTO ttlive.doubles VALUES (31, 3, true, 'Callsen', 'Grahl', 7);
INSERT INTO ttlive.doubles VALUES (28, 1, false, 'Nidopytalski', 'Hagemann', 7);
INSERT INTO ttlive.doubles VALUES (30, 2, false, 'Nidopytalski', 'Rost', 7);
INSERT INTO ttlive.doubles VALUES (32, 3, false, 'Fürste', 'Picandet', 7);
INSERT INTO ttlive.doubles VALUES (57, 2, true, 'Anja Scholz', 'Annika Zeyn', 13);
INSERT INTO ttlive.doubles VALUES (37, 1, true, 'Vollmer', 'Cao', 9);
INSERT INTO ttlive.doubles VALUES (39, 2, true, 'Papenfuß', 'Seidel', 9);
INSERT INTO ttlive.doubles VALUES (41, 3, true, 'Völkle', 'Putschenkin', 9);
INSERT INTO ttlive.doubles VALUES (38, 1, false, 'Pflantz', 'Eisner', 9);
INSERT INTO ttlive.doubles VALUES (40, 2, false, 'Vater', 'Milla', 9);
INSERT INTO ttlive.doubles VALUES (42, 3, false, 'Walter', 'Larsch', 9);
INSERT INTO ttlive.doubles VALUES (43, 1, true, 'Nany', 'Manshi', 10);
INSERT INTO ttlive.doubles VALUES (45, 2, true, 'Annika', 'Franzi', 10);
INSERT INTO ttlive.doubles VALUES (44, 1, false, 'Krüger', 'Krüger', 10);
INSERT INTO ttlive.doubles VALUES (46, 2, false, 'Angrick', 'Wiechern', 10);
INSERT INTO ttlive.doubles VALUES (83, 1, true, 'Andre', 'David S.', 20);
INSERT INTO ttlive.doubles VALUES (85, 2, true, 'Steffen', 'David G.', 20);
INSERT INTO ttlive.doubles VALUES (84, 1, false, 'Wüpper', 'Surek', 20);
INSERT INTO ttlive.doubles VALUES (86, 2, false, 'Laubach', 'Plettenberg', 20);
INSERT INTO ttlive.doubles VALUES (88, 1, false, 'Huong Ly', 'Ha My', 21);
INSERT INTO ttlive.doubles VALUES (64, 1, false, 'Larissa', 'Nancy', 15);
INSERT INTO ttlive.doubles VALUES (66, 2, false, 'Manshi', 'Anja', 15);
INSERT INTO ttlive.doubles VALUES (63, 1, true, 'Maxi', 'Melanie', 15);
INSERT INTO ttlive.doubles VALUES (65, 2, true, 'Sandy', 'Sophie', 15);
INSERT INTO ttlive.doubles VALUES (90, 2, false, 'Michi', 'Svenja', 21);
INSERT INTO ttlive.doubles VALUES (87, 1, true, 'Schwarz', 'Wendt', 21);
INSERT INTO ttlive.doubles VALUES (67, 1, true, 'Dornemann', 'Schön', 16);
INSERT INTO ttlive.doubles VALUES (69, 2, true, 'Puskas', 'Jordan', 16);
INSERT INTO ttlive.doubles VALUES (68, 1, false, 'Manshika', 'Anja', 16);
INSERT INTO ttlive.doubles VALUES (70, 2, false, 'Larissa', 'Nancy', 16);
INSERT INTO ttlive.doubles VALUES (71, 1, true, 'Goretzki, Alina', 'Steding, Svenja', 17);
INSERT INTO ttlive.doubles VALUES (73, 2, true, 'Cao, Huong Ly', 'Zeyn, Annika', 17);
INSERT INTO ttlive.doubles VALUES (72, 1, false, 'Roggatz', 'Joachimmeyer', 17);
INSERT INTO ttlive.doubles VALUES (74, 2, false, 'Reissmann', 'Opitz', 17);
INSERT INTO ttlive.doubles VALUES (76, 1, false, 'Alina Goretzki', 'Svenja Steding', 18);
INSERT INTO ttlive.doubles VALUES (89, 2, true, 'Decker', 'Decker', 21);
INSERT INTO ttlive.doubles VALUES (78, 2, false, 'Huong Ly Cao', 'Annika Zeyn', 18);
INSERT INTO ttlive.doubles VALUES (75, 1, true, 'Meyer', 'Rathjen', 18);
INSERT INTO ttlive.doubles VALUES (77, 2, true, 'Dunker', 'Arnecke', 18);
INSERT INTO ttlive.doubles VALUES (80, 1, false, 'Huong Ly Cao', 'Alina Goretzki', 19);
INSERT INTO ttlive.doubles VALUES (82, 2, false, 'Svenja Steding', 'Ha My, Cao', 19);
INSERT INTO ttlive.doubles VALUES (79, 1, true, 'Dallmeier', 'Kabel', 19);
INSERT INTO ttlive.doubles VALUES (81, 2, true, 'Molatta', '?', 19);


--
-- Data for Name: player; Type: TABLE DATA; Schema: ttlive; Owner: ttlive
--

INSERT INTO ttlive.player VALUES (53, 'Jannsen', 1, true, '2022-12-02 20:23:54.854714', '2022-12-02 20:24:54.471112', 7);
INSERT INTO ttlive.player VALUES (54, 'Hoffmann', 2, true, '2022-12-02 20:23:54.856571', '2022-12-02 20:24:54.471434', 7);
INSERT INTO ttlive.player VALUES (55, 'Feddern', 3, true, '2022-12-02 20:23:54.857487', '2022-12-02 20:24:54.471703', 7);
INSERT INTO ttlive.player VALUES (56, 'Callsen', 4, true, '2022-12-02 20:23:54.860158', '2022-12-02 20:24:54.472082', 7);
INSERT INTO ttlive.player VALUES (57, 'Grahl', 5, true, '2022-12-02 20:23:54.861601', '2022-12-02 20:24:54.472409', 7);
INSERT INTO ttlive.player VALUES (58, 'Ho', 6, true, '2022-12-02 20:23:54.862976', '2022-12-02 20:24:54.472792', 7);
INSERT INTO ttlive.player VALUES (59, 'Herkenhoff', 1, false, '2022-12-02 20:23:54.87134', '2022-12-02 20:27:25.092995', 7);
INSERT INTO ttlive.player VALUES (60, 'Nidopytalsk', 2, false, '2022-12-02 20:23:54.871935', '2022-12-02 20:27:25.093421', 7);
INSERT INTO ttlive.player VALUES (61, 'Rost', 3, false, '2022-12-02 20:23:54.872392', '2022-12-02 20:27:25.093865', 7);
INSERT INTO ttlive.player VALUES (62, 'Fürste', 4, false, '2022-12-02 20:23:54.872781', '2022-12-02 20:27:25.094142', 7);
INSERT INTO ttlive.player VALUES (63, 'Hagemann', 5, false, '2022-12-02 20:23:54.873147', '2022-12-02 20:27:25.094468', 7);
INSERT INTO ttlive.player VALUES (64, 'Picandet', 6, false, '2022-12-02 20:23:54.873678', '2022-12-02 20:27:25.094657', 7);
INSERT INTO ttlive.player VALUES (25, 'David S.', 1, true, '2022-11-20 00:00:48.07324', '2022-11-20 00:41:24.506089', 4);
INSERT INTO ttlive.player VALUES (26, 'Andre', 2, true, '2022-11-20 00:00:48.078838', '2022-11-20 00:41:24.535522', 4);
INSERT INTO ttlive.player VALUES (27, 'Steffen', 3, true, '2022-11-20 00:00:48.086672', '2022-11-20 00:41:24.53727', 4);
INSERT INTO ttlive.player VALUES (28, 'David G.', 4, true, '2022-11-20 00:00:48.091518', '2022-11-20 00:41:24.538502', 4);
INSERT INTO ttlive.player VALUES (29, 'Gote', 1, false, '2022-11-20 00:00:48.107755', '2022-11-20 11:30:09.606846', 4);
INSERT INTO ttlive.player VALUES (30, 'Quedenfeldt', 2, false, '2022-11-20 00:00:48.113632', '2022-11-20 11:30:09.611237', 4);
INSERT INTO ttlive.player VALUES (31, 'Drücker', 3, false, '2022-11-20 00:00:48.116921', '2022-11-20 11:30:09.612146', 4);
INSERT INTO ttlive.player VALUES (32, 'Hamann', 4, false, '2022-11-20 00:00:48.119457', '2022-11-20 11:30:09.612734', 4);
INSERT INTO ttlive.player VALUES (33, 'David S.', 1, true, '2022-11-26 16:49:45.935742', '2022-11-26 21:13:39.557419', 5);
INSERT INTO ttlive.player VALUES (34, 'Andre', 2, true, '2022-11-26 16:49:45.939135', '2022-11-26 21:13:39.573223', 5);
INSERT INTO ttlive.player VALUES (35, 'Steffen', 3, true, '2022-11-26 16:49:45.940619', '2022-11-26 21:13:39.574823', 5);
INSERT INTO ttlive.player VALUES (36, 'Kosta ', 4, true, '2022-11-26 16:49:45.943078', '2022-11-26 21:13:39.575553', 5);
INSERT INTO ttlive.player VALUES (38, 'Hofmann M', 2, false, '2022-11-26 16:49:45.947717', '2022-11-27 11:05:20.875074', 5);
INSERT INTO ttlive.player VALUES (39, 'Hoffmann J-P.', 3, false, '2022-11-26 16:49:45.948458', '2022-11-27 11:05:20.885278', 5);
INSERT INTO ttlive.player VALUES (40, 'Schneide M.', 4, false, '2022-11-26 16:49:45.94966', '2022-11-27 11:05:20.886285', 5);
INSERT INTO ttlive.player VALUES (37, 'Hausberg ', 1, false, '2022-11-26 16:49:45.947059', '2022-11-27 11:05:20.886877', 5);
INSERT INTO ttlive.player VALUES (86, 'Manshi', 2, true, '2022-12-03 13:48:40.640269', '2022-12-03 14:00:54.092192', 10);
INSERT INTO ttlive.player VALUES (87, 'Annika', 3, true, '2022-12-03 13:48:40.642661', '2022-12-03 14:00:54.092679', 10);
INSERT INTO ttlive.player VALUES (88, 'Franzi', 4, true, '2022-12-03 13:48:40.645056', '2022-12-03 14:00:54.093216', 10);
INSERT INTO ttlive.player VALUES (89, 'Krüger, Antje', 1, false, '2022-12-03 13:48:40.65071', '2022-12-03 14:03:25.083787', 10);
INSERT INTO ttlive.player VALUES (90, 'Angrick', 2, false, '2022-12-03 13:48:40.651772', '2022-12-03 14:03:25.084479', 10);
INSERT INTO ttlive.player VALUES (91, 'Wiechern', 3, false, '2022-12-03 13:48:40.652608', '2022-12-03 14:03:25.084884', 10);
INSERT INTO ttlive.player VALUES (92, 'Krüger, Lena', 4, false, '2022-12-03 13:48:40.653346', '2022-12-03 14:03:25.085358', 10);
INSERT INTO ttlive.player VALUES (85, 'Nancy', 1, true, '2022-12-03 13:48:40.636897', '2022-12-03 16:11:22.284197', 10);
INSERT INTO ttlive.player VALUES (73, 'Papenfuß', 1, true, '2022-12-03 12:57:23.472319', '2022-12-03 13:00:19.149645', 9);
INSERT INTO ttlive.player VALUES (74, 'Vollmer', 2, true, '2022-12-03 12:57:23.477109', '2022-12-03 13:00:19.15705', 9);
INSERT INTO ttlive.player VALUES (75, 'Seidel', 3, true, '2022-12-03 12:57:23.480523', '2022-12-03 13:00:19.161872', 9);
INSERT INTO ttlive.player VALUES (76, 'Cao', 4, true, '2022-12-03 12:57:23.483476', '2022-12-03 13:00:19.163894', 9);
INSERT INTO ttlive.player VALUES (77, 'Völkle', 5, true, '2022-12-03 12:57:23.486678', '2022-12-03 13:00:19.16699', 9);
INSERT INTO ttlive.player VALUES (78, 'Putschenkin', 6, true, '2022-12-03 12:57:23.489465', '2022-12-03 13:00:19.171332', 9);
INSERT INTO ttlive.player VALUES (79, 'Pflantz', 1, false, '2022-12-03 12:57:23.506729', '2022-12-03 13:01:24.677917', 9);
INSERT INTO ttlive.player VALUES (80, 'Vater', 2, false, '2022-12-03 12:57:23.507812', '2022-12-03 13:01:24.678487', 9);
INSERT INTO ttlive.player VALUES (83, 'Eisner', 5, false, '2022-12-03 12:57:23.511177', '2022-12-03 13:01:24.679919', 9);
INSERT INTO ttlive.player VALUES (84, 'Larsch', 6, false, '2022-12-03 12:57:23.512247', '2022-12-03 13:01:24.680284', 9);
INSERT INTO ttlive.player VALUES (81, 'Milla', 3, false, '2022-12-03 12:57:23.50883', '2022-12-03 13:03:58.055019', 9);
INSERT INTO ttlive.player VALUES (82, 'Walter', 4, false, '2022-12-03 12:57:23.509994', '2022-12-03 13:03:58.056922', 9);
INSERT INTO ttlive.player VALUES (93, 'David S', 1, true, '2022-12-04 10:11:02.797882', '2022-12-04 10:22:50.25169', 11);
INSERT INTO ttlive.player VALUES (94, 'Andre', 2, true, '2022-12-04 10:11:02.801444', '2022-12-04 10:22:50.253118', 11);
INSERT INTO ttlive.player VALUES (96, 'Lutz', 4, true, '2022-12-04 10:11:02.806264', '2022-12-04 10:22:50.253869', 11);
INSERT INTO ttlive.player VALUES (97, 'Do', 1, false, '2022-12-04 10:11:02.83367', '2022-12-04 10:39:02.179807', 11);
INSERT INTO ttlive.player VALUES (98, 'Wieben', 2, false, '2022-12-04 10:11:02.83487', '2022-12-04 10:39:02.181796', 11);
INSERT INTO ttlive.player VALUES (99, 'Brecker', 3, false, '2022-12-04 10:11:02.835495', '2022-12-04 10:39:02.182146', 11);
INSERT INTO ttlive.player VALUES (100, 'Stegmann', 4, false, '2022-12-04 10:11:02.836', '2022-12-04 10:40:30.628061', 11);
INSERT INTO ttlive.player VALUES (95, 'David G.', 3, true, '2022-12-04 10:11:02.803036', '2022-12-04 10:50:13.666088', 11);
INSERT INTO ttlive.player VALUES (101, 'Manshi', 1, true, '2022-12-04 11:19:35.836972', '2022-12-04 11:21:03.214565', 12);
INSERT INTO ttlive.player VALUES (102, 'Anja', 2, true, '2022-12-04 11:19:35.838028', '2022-12-04 11:21:03.21624', 12);
INSERT INTO ttlive.player VALUES (103, 'Alina', 3, true, '2022-12-04 11:19:35.840346', '2022-12-04 11:21:03.216888', 12);
INSERT INTO ttlive.player VALUES (104, 'Annika', 4, true, '2022-12-04 11:19:35.841332', '2022-12-04 13:54:58.239551', 12);
INSERT INTO ttlive.player VALUES (105, 'Aye', 1, false, '2022-12-04 11:19:35.844668', '2022-12-04 13:55:54.391221', 12);
INSERT INTO ttlive.player VALUES (106, 'Carl', 2, false, '2022-12-04 11:19:35.845127', '2022-12-04 13:55:54.391566', 12);
INSERT INTO ttlive.player VALUES (107, 'Gering', 3, false, '2022-12-04 11:19:35.845532', '2022-12-04 13:55:54.391852', 12);
INSERT INTO ttlive.player VALUES (108, 'Pfeiffer', 4, false, '2022-12-04 11:19:35.845976', '2022-12-04 13:55:54.392098', 12);
INSERT INTO ttlive.player VALUES (113, 'Tanja Grzymek', 1, false, '2022-12-10 09:03:58.038917', '2022-12-10 11:33:46.340922', 13);
INSERT INTO ttlive.player VALUES (114, 'Anna Maria Ochenkowski', 2, false, '2022-12-10 09:03:58.040408', '2022-12-10 11:33:46.341456', 13);
INSERT INTO ttlive.player VALUES (115, 'Fabia Gisder', 3, false, '2022-12-10 09:03:58.041432', '2022-12-10 11:33:46.341775', 13);
INSERT INTO ttlive.player VALUES (116, 'Sophie Zeisberger', 4, false, '2022-12-10 09:03:58.042186', '2022-12-10 11:33:46.342073', 13);
INSERT INTO ttlive.player VALUES (110, 'Anja Scholz', 2, true, '2022-12-10 09:03:58.013768', '2022-12-10 11:34:25.099021', 13);
INSERT INTO ttlive.player VALUES (111, 'Annika Zeyn', 3, true, '2022-12-10 09:03:58.015736', '2022-12-10 11:34:25.099577', 13);
INSERT INTO ttlive.player VALUES (112, 'Huong Ly Cao', 4, true, '2022-12-10 09:03:58.019823', '2022-12-10 11:34:25.099908', 13);
INSERT INTO ttlive.player VALUES (109, 'Manshika Arora', 1, true, '2022-12-10 09:03:58.008295', '2022-12-10 11:34:25.100217', 13);
INSERT INTO ttlive.player VALUES (129, 'Larissa', 1, false, '2023-01-14 13:56:48.480434', '2023-01-14 13:58:49.878316', 15);
INSERT INTO ttlive.player VALUES (130, 'Nancy', 2, false, '2023-01-14 13:56:48.48258', '2023-01-14 13:58:49.879612', 15);
INSERT INTO ttlive.player VALUES (131, 'Manshi', 3, false, '2023-01-14 13:56:48.484216', '2023-01-14 13:58:49.880106', 15);
INSERT INTO ttlive.player VALUES (132, 'Anja', 4, false, '2023-01-14 13:56:48.487521', '2023-01-14 13:58:49.880503', 15);
INSERT INTO ttlive.player VALUES (126, 'Sandy', 2, true, '2023-01-14 13:56:48.443594', '2023-01-14 14:01:14.621126', 15);
INSERT INTO ttlive.player VALUES (127, 'Sophie', 3, true, '2023-01-14 13:56:48.445808', '2023-01-14 14:01:14.622256', 15);
INSERT INTO ttlive.player VALUES (128, 'Melanie', 4, true, '2023-01-14 13:56:48.453286', '2023-01-14 14:01:14.622852', 15);
INSERT INTO ttlive.player VALUES (125, 'Maxi', 1, true, '2023-01-14 13:56:48.438161', '2023-01-14 14:01:14.623183', 15);
INSERT INTO ttlive.player VALUES (137, 'Larissa', 1, false, '2023-01-15 09:55:38.431315', '2023-01-15 09:57:58.694891', 16);
INSERT INTO ttlive.player VALUES (138, 'Nancy', 2, false, '2023-01-15 09:55:38.43203', '2023-01-15 09:57:58.695247', 16);
INSERT INTO ttlive.player VALUES (139, 'Manshika', 3, false, '2023-01-15 09:55:38.432849', '2023-01-15 09:57:58.695524', 16);
INSERT INTO ttlive.player VALUES (140, 'Anja', 4, false, '2023-01-15 09:55:38.433311', '2023-01-15 09:57:58.697068', 16);
INSERT INTO ttlive.player VALUES (145, 'Reissmann', 1, false, '2023-01-15 10:46:17.839441', '2023-01-15 14:05:16.197528', 17);
INSERT INTO ttlive.player VALUES (146, 'Opitz', 2, false, '2023-01-15 10:46:17.840141', '2023-01-15 14:05:16.200111', 17);
INSERT INTO ttlive.player VALUES (147, 'Roggatz', 3, false, '2023-01-15 10:46:17.841091', '2023-01-15 14:05:16.200564', 17);
INSERT INTO ttlive.player VALUES (148, 'Joachimmeyer', 4, false, '2023-01-15 10:46:17.841781', '2023-01-15 14:05:16.200861', 17);
INSERT INTO ttlive.player VALUES (141, 'Cao, Huong Ly', 1, true, '2023-01-15 10:46:17.829991', '2023-01-15 10:48:47.903959', 17);
INSERT INTO ttlive.player VALUES (133, 'Puskas', 1, true, '2023-01-15 09:55:38.418455', '2023-01-15 10:56:33.626229', 16);
INSERT INTO ttlive.player VALUES (134, 'Jordan', 2, true, '2023-01-15 09:55:38.422638', '2023-01-15 10:56:33.626864', 16);
INSERT INTO ttlive.player VALUES (135, 'Dornemann', 3, true, '2023-01-15 09:55:38.424305', '2023-01-15 10:56:33.627075', 16);
INSERT INTO ttlive.player VALUES (136, 'Schön', 4, true, '2023-01-15 09:55:38.426653', '2023-01-15 10:56:33.627352', 16);
INSERT INTO ttlive.player VALUES (142, 'Goretzki, Alina', 2, true, '2023-01-15 10:46:17.832873', '2023-01-15 10:48:47.906325', 17);
INSERT INTO ttlive.player VALUES (143, 'Zeyn, Annika', 3, true, '2023-01-15 10:46:17.834206', '2023-01-15 10:48:47.907065', 17);
INSERT INTO ttlive.player VALUES (144, 'Steding, Svenja', 4, true, '2023-01-15 10:46:17.835573', '2023-01-15 10:48:47.907324', 17);
INSERT INTO ttlive.player VALUES (154, 'Alina Goretzki', 2, false, '2023-01-26 19:09:39.441711', '2023-01-26 19:38:10.561795', 18);
INSERT INTO ttlive.player VALUES (155, 'Annika Zeyn', 3, false, '2023-01-26 19:09:39.443397', '2023-01-26 19:38:10.562274', 18);
INSERT INTO ttlive.player VALUES (156, 'Svenja Steding', 4, false, '2023-01-26 19:09:39.443903', '2023-01-26 19:38:10.562679', 18);
INSERT INTO ttlive.player VALUES (153, 'Huong Ly Cao', 1, false, '2023-01-26 19:09:39.440876', '2023-01-26 19:38:37.537088', 18);
INSERT INTO ttlive.player VALUES (149, 'Rathjen', 1, true, '2023-01-26 19:09:39.4261', '2023-01-26 19:39:11.375812', 18);
INSERT INTO ttlive.player VALUES (150, 'Meyer', 2, true, '2023-01-26 19:09:39.429908', '2023-01-26 19:39:11.376318', 18);
INSERT INTO ttlive.player VALUES (151, 'Dunker', 3, true, '2023-01-26 19:09:39.431662', '2023-01-26 19:39:11.376742', 18);
INSERT INTO ttlive.player VALUES (152, 'Arnecke', 4, true, '2023-01-26 19:09:39.433404', '2023-01-26 19:39:11.377165', 18);
INSERT INTO ttlive.player VALUES (161, 'Huong Ly Cao', 1, false, '2023-02-11 12:38:07.145212', '2023-02-11 14:58:42.320453', 19);
INSERT INTO ttlive.player VALUES (162, 'Alina Goretzki', 2, false, '2023-02-11 12:38:07.146046', '2023-02-11 14:58:42.327612', 19);
INSERT INTO ttlive.player VALUES (163, 'Svenja Steding', 3, false, '2023-02-11 12:38:07.146764', '2023-02-11 14:58:42.330169', 19);
INSERT INTO ttlive.player VALUES (164, 'Ha My, Cao', 4, false, '2023-02-11 12:38:07.14749', '2023-02-11 14:58:42.331081', 19);
INSERT INTO ttlive.player VALUES (157, 'Dallmeier', 1, true, '2023-02-11 12:38:07.131686', '2023-02-11 15:02:17.750945', 19);
INSERT INTO ttlive.player VALUES (158, 'Kabel', 2, true, '2023-02-11 12:38:07.134611', '2023-02-11 15:02:17.752921', 19);
INSERT INTO ttlive.player VALUES (159, 'Molatta', 3, true, '2023-02-11 12:38:07.135783', '2023-02-11 15:02:17.75362', 19);
INSERT INTO ttlive.player VALUES (160, '?', 4, true, '2023-02-11 12:38:07.138453', '2023-02-11 15:02:17.754048', 19);
INSERT INTO ttlive.player VALUES (165, 'Andre', 1, true, '2023-02-12 09:27:46.930654', '2023-02-12 09:28:15.791493', 20);
INSERT INTO ttlive.player VALUES (166, 'David S.', 2, true, '2023-02-12 09:27:46.935019', '2023-02-12 09:28:15.79302', 20);
INSERT INTO ttlive.player VALUES (167, 'Steffen', 3, true, '2023-02-12 09:27:46.937056', '2023-02-12 09:28:15.793367', 20);
INSERT INTO ttlive.player VALUES (168, 'David G.', 4, true, '2023-02-12 09:27:46.941911', '2023-02-12 09:28:15.793627', 20);
INSERT INTO ttlive.player VALUES (169, 'Laubach', 1, false, '2023-02-12 09:27:46.946313', '2023-02-12 11:12:39.792305', 20);
INSERT INTO ttlive.player VALUES (170, 'Plettenberg', 2, false, '2023-02-12 09:27:46.946935', '2023-02-12 11:12:39.794318', 20);
INSERT INTO ttlive.player VALUES (171, 'Wüpper', 3, false, '2023-02-12 09:27:46.947451', '2023-02-12 11:12:39.7948', 20);
INSERT INTO ttlive.player VALUES (172, 'Surek', 4, false, '2023-02-12 09:27:46.947932', '2023-02-12 11:12:39.795184', 20);
INSERT INTO ttlive.player VALUES (177, 'Michi', 1, false, '2023-02-12 13:49:27.796155', '2023-02-12 14:55:50.385399', 21);
INSERT INTO ttlive.player VALUES (178, 'Huong Ly', 2, false, '2023-02-12 13:49:27.796917', '2023-02-12 14:55:50.386794', 21);
INSERT INTO ttlive.player VALUES (179, 'Alina', 3, false, '2023-02-12 13:49:27.797599', '2023-02-12 14:55:50.387131', 21);
INSERT INTO ttlive.player VALUES (180, 'Ha My', 4, false, '2023-02-12 13:49:27.797946', '2023-02-12 14:55:50.387458', 21);
INSERT INTO ttlive.player VALUES (173, 'Schwarz', 1, true, '2023-02-12 13:49:27.786253', '2023-02-12 15:33:06.986631', 21);
INSERT INTO ttlive.player VALUES (174, 'Wendt', 2, true, '2023-02-12 13:49:27.78788', '2023-02-12 15:33:06.987514', 21);
INSERT INTO ttlive.player VALUES (175, 'Decker', 3, true, '2023-02-12 13:49:27.788902', '2023-02-12 15:33:06.987785', 21);
INSERT INTO ttlive.player VALUES (176, 'Decker', 4, true, '2023-02-12 13:49:27.790121', '2023-02-12 15:33:06.98799', 21);


--
-- Data for Name: game; Type: TABLE DATA; Schema: ttlive; Owner: ttlive
--

INSERT INTO ttlive.game VALUES (74, 'FINISHED', 8, false, '11:-1', '-1:11', '-1:11', '-1:11', NULL, 1, 3, 7, 57, 64, NULL, NULL, '2022-12-02 20:23:54.862367', '2022-12-02 21:40:15.210268');
INSERT INTO ttlive.game VALUES (39, 'FINISHED', 9, false, '7:11', '13:11', '11:9', '11:9', NULL, 3, 1, 4, 27, 31, NULL, NULL, '2022-11-20 00:00:48.101532', '2022-11-20 14:05:18.726847');
INSERT INTO ttlive.game VALUES (44, 'FINISHED', 4, false, '7:11', '13:11', '11:6', '11:8', NULL, 3, 1, 5, 34, 37, NULL, NULL, '2022-11-26 16:49:45.939849', '2022-11-27 12:22:54.149634');
INSERT INTO ttlive.game VALUES (40, 'FINISHED', 10, false, '11:-1', '11:-1', '11:-1', NULL, NULL, 3, 0, 4, 28, 32, NULL, NULL, '2022-11-20 00:00:48.103663', '2023-02-02 22:18:45.263426');
INSERT INTO ttlive.game VALUES (43, 'FINISHED', 3, false, '9:11', '11:7', '7:11', '9:11', NULL, 1, 3, 5, 33, 38, NULL, NULL, '2022-11-26 16:49:45.938021', '2022-11-27 12:28:02.978994');
INSERT INTO ttlive.game VALUES (32, 'FINISHED', 2, true, '8:11', '11:9', '11:6', '10:12', '11:2', 3, 2, 4, NULL, NULL, 15, 16, '2022-11-20 00:00:48.069165', '2023-02-02 17:22:54.405051');
INSERT INTO ttlive.game VALUES (75, 'FINISHED', 9, false, '11:-1', '11:-1', '-1:11', '-1:11', '-1:11', 2, 3, 7, 58, 63, NULL, NULL, '2022-12-02 20:23:54.863837', '2022-12-02 22:08:07.124013');
INSERT INTO ttlive.game VALUES (76, 'NOT_STARTED', 10, false, NULL, NULL, NULL, NULL, NULL, 0, 0, 7, 53, 59, NULL, NULL, '2022-12-02 20:23:54.864364', '2022-12-02 20:23:54.878446');
INSERT INTO ttlive.game VALUES (33, 'FINISHED', 3, false, '11:7', '11:4', '8:11', '11:5', NULL, 3, 1, 4, 25, 30, NULL, NULL, '2022-11-20 00:00:48.07669', '2022-11-20 12:31:19.706859');
INSERT INTO ttlive.game VALUES (115, 'FINISHED', 5, false, '12:10', '8:11', '11:9', '11:5', NULL, 3, 1, 10, 87, 92, NULL, NULL, '2022-12-03 13:48:40.643689', '2022-12-03 15:30:14.064397');
INSERT INTO ttlive.game VALUES (34, 'FINISHED', 4, false, '7:11', '8:11', '11:7', '11:8', '11:5', 3, 2, 4, 26, 29, NULL, NULL, '2022-11-20 00:00:48.083528', '2022-11-20 12:40:13.815741');
INSERT INTO ttlive.game VALUES (70, 'FINISHED', 4, false, '7:11', '7:11', '6:11', '-1:11', NULL, 0, 3, 7, 53, 60, NULL, NULL, '2022-12-02 20:23:54.855913', '2022-12-02 20:36:46.070828');
INSERT INTO ttlive.game VALUES (35, 'FINISHED', 5, false, '11:7', '11:5', '11:2', NULL, NULL, 3, 0, 4, 27, 32, NULL, NULL, '2022-11-20 00:00:48.088139', '2022-11-20 12:53:12.105759');
INSERT INTO ttlive.game VALUES (116, 'FINISHED', 6, false, '7:11', '8:11', '11:7', '9:11', NULL, 1, 3, 10, 88, 91, NULL, NULL, '2022-12-03 13:48:40.646047', '2022-12-03 15:30:32.993776');
INSERT INTO ttlive.game VALUES (119, 'FINISHED', 9, false, '5:11', '11:8', '8:11', '6:11', NULL, 1, 3, 10, 87, 91, NULL, NULL, '2022-12-03 13:48:40.649025', '2022-12-03 16:32:28.456311');
INSERT INTO ttlive.game VALUES (77, 'NOT_STARTED', 11, false, NULL, NULL, NULL, NULL, NULL, 0, 0, 7, 54, 60, NULL, NULL, '2022-12-02 20:23:54.864875', '2022-12-02 20:23:54.87878');
INSERT INTO ttlive.game VALUES (36, 'FINISHED', 6, false, '6:11', '11:4', '11:3', '8:11', '11:13', 2, 3, 4, 28, 31, NULL, NULL, '2022-11-20 00:00:48.093445', '2022-11-20 13:17:32.545665');
INSERT INTO ttlive.game VALUES (45, 'FINISHED', 5, false, '11:3', '11:5', '10:12', '4:11', '11:3', 3, 2, 5, 35, 40, NULL, NULL, '2022-11-26 16:49:45.941115', '2022-11-27 12:55:45.626211');
INSERT INTO ttlive.game VALUES (46, 'FINISHED', 6, false, '11:8', '11:9', '10:12', '11:6', NULL, 3, 1, 5, 36, 39, NULL, NULL, '2022-11-26 16:49:45.943625', '2022-11-27 13:00:20.925999');
INSERT INTO ttlive.game VALUES (37, 'FINISHED', 7, false, '11:5', '11:9', '9:11', '12:14', '9:11', 2, 3, 4, 25, 29, NULL, NULL, '2022-11-20 00:00:48.096118', '2022-11-20 13:32:52.046243');
INSERT INTO ttlive.game VALUES (38, 'FINISHED', 8, false, '11:4', '11:4', '11:6', NULL, NULL, 3, 0, 4, 26, 30, NULL, NULL, '2022-11-20 00:00:48.099665', '2022-11-20 13:34:03.20773');
INSERT INTO ttlive.game VALUES (49, 'FINISHED', 9, false, '11:5', '11:7', '11:7', NULL, NULL, 3, 0, 5, 35, 39, NULL, NULL, '2022-11-26 16:49:45.945839', '2022-11-27 13:43:36.483858');
INSERT INTO ttlive.game VALUES (50, 'FINISHED', 10, false, '11:7', '11:6', '11:5', NULL, NULL, 3, 0, 5, 36, 40, NULL, NULL, '2022-11-26 16:49:45.946395', '2022-11-27 13:52:05.777712');
INSERT INTO ttlive.game VALUES (41, 'FINISHED', 1, true, '5:11', '13:11', '11:6', '11:6', NULL, 3, 1, 5, NULL, NULL, 17, 18, '2022-11-26 16:49:45.928713', '2022-11-27 11:56:58.268385');
INSERT INTO ttlive.game VALUES (47, 'FINISHED', 7, false, '11:9', '10:12', '7:11', '5:11', NULL, 1, 3, 5, 33, 37, NULL, NULL, '2022-11-26 16:49:45.944588', '2022-11-27 13:21:18.195392');
INSERT INTO ttlive.game VALUES (42, 'FINISHED', 2, true, '11:5', '8:11', '13:11', '11:7', NULL, 3, 1, 5, NULL, NULL, 19, 20, '2022-11-26 16:49:45.931035', '2022-11-27 12:01:30.332073');
INSERT INTO ttlive.game VALUES (48, 'FINISHED', 8, false, '9:11', '12:10', '5:11', '11:5', '14:12', 3, 2, 5, 34, 38, NULL, NULL, '2022-11-26 16:49:45.945169', '2022-11-27 13:34:34.871999');
INSERT INTO ttlive.game VALUES (112, 'FINISHED', 2, true, '8:11', '7:11', '11:6', '6:11', NULL, 1, 3, 10, NULL, NULL, 45, 46, '2022-12-03 13:48:40.635546', '2022-12-03 14:24:52.837637');
INSERT INTO ttlive.game VALUES (118, 'FINISHED', 8, false, '6:11', '7:11', '11:7', '13:11', '6:11', 2, 3, 10, 86, 90, NULL, NULL, '2022-12-03 13:48:40.648166', '2022-12-03 16:08:42.744645');
INSERT INTO ttlive.game VALUES (143, 'FINISHED', 3, false, '-1:11', '11:6', '-1:11', '11:-1', '-1:11', 2, 3, 13, 109, 114, NULL, NULL, '2022-12-10 09:03:58.011789', '2022-12-10 12:01:10.235792');
INSERT INTO ttlive.game VALUES (113, 'FINISHED', 3, false, '6:11', '9:11', '11:9', '11:4', '12:10', 3, 2, 10, 85, 90, NULL, NULL, '2022-12-03 13:48:40.638815', '2022-12-03 14:59:43.913212');
INSERT INTO ttlive.game VALUES (111, 'FINISHED', 1, true, '14:12', '11:8', '8:11', '11:6', NULL, 3, 1, 10, NULL, NULL, 43, 44, '2022-12-03 13:48:40.632982', '2022-12-03 14:26:36.412384');
INSERT INTO ttlive.game VALUES (114, 'FINISHED', 4, false, '21:23', '11:6', '11:7', '11:6', NULL, 3, 1, 10, 86, 89, NULL, NULL, '2022-12-03 13:48:40.64145', '2022-12-03 15:04:59.221487');
INSERT INTO ttlive.game VALUES (120, 'FINISHED', 10, false, '7:11', '9:11', '11:8', '11:7', '11:8', 3, 2, 10, 88, 92, NULL, NULL, '2022-12-03 13:48:40.649818', '2022-12-03 16:32:19.974785');
INSERT INTO ttlive.game VALUES (117, 'FINISHED', 7, false, '7:11', '12:10', '11:6', '12:10', NULL, 3, 1, 10, 85, 89, NULL, NULL, '2022-12-03 13:48:40.647206', '2022-12-03 16:09:49.472014');
INSERT INTO ttlive.game VALUES (82, 'NOT_STARTED', 16, true, NULL, NULL, NULL, NULL, NULL, 0, 0, 7, NULL, NULL, 27, 28, '2022-12-02 20:23:54.870333', '2022-12-02 20:23:54.870349');
INSERT INTO ttlive.game VALUES (69, 'FINISHED', 3, true, '11:8', '3:11', '11:13', '11:6', '10:12', 2, 3, 7, NULL, NULL, 31, 32, '2022-12-02 20:23:54.853095', '2022-12-02 20:35:31.212043');
INSERT INTO ttlive.game VALUES (72, 'FINISHED', 6, false, '8:11', '10:12', '11:1', '11:6', '3:11', 2, 3, 7, 55, 62, NULL, NULL, '2022-12-02 20:23:54.858494', '2022-12-02 21:12:47.6386');
INSERT INTO ttlive.game VALUES (73, 'FINISHED', 7, false, '-1:11', '-1:11', '11:-1', '-1:11', NULL, 1, 3, 7, 56, 61, NULL, NULL, '2022-12-02 20:23:54.860937', '2022-12-02 21:29:58.858236');
INSERT INTO ttlive.game VALUES (78, 'NOT_STARTED', 12, false, NULL, NULL, NULL, NULL, NULL, 0, 0, 7, 55, 61, NULL, NULL, '2022-12-02 20:23:54.865439', '2022-12-02 20:23:54.879077');
INSERT INTO ttlive.game VALUES (79, 'NOT_STARTED', 13, false, NULL, NULL, NULL, NULL, NULL, 0, 0, 7, 56, 62, NULL, NULL, '2022-12-02 20:23:54.868329', '2022-12-02 20:23:54.879365');
INSERT INTO ttlive.game VALUES (80, 'NOT_STARTED', 14, false, NULL, NULL, NULL, NULL, NULL, 0, 0, 7, 57, 63, NULL, NULL, '2022-12-02 20:23:54.869099', '2022-12-02 20:23:54.879653');
INSERT INTO ttlive.game VALUES (81, 'NOT_STARTED', 15, false, NULL, NULL, NULL, NULL, NULL, 0, 0, 7, 58, 64, NULL, NULL, '2022-12-02 20:23:54.869621', '2022-12-02 20:23:54.879939');
INSERT INTO ttlive.game VALUES (144, 'FINISHED', 4, false, '11:-1', '11:-1', '11:-1', NULL, NULL, 3, 0, 13, 110, 113, NULL, NULL, '2022-12-10 09:03:58.014811', '2022-12-10 11:50:50.057172');
INSERT INTO ttlive.game VALUES (68, 'FINISHED', 2, true, '-1:11', '11:-1', '-1:11', '11:-1', '5:11', 2, 3, 7, NULL, NULL, 29, 28, '2022-12-02 20:23:54.85258', '2022-12-02 20:36:10.856779');
INSERT INTO ttlive.game VALUES (146, 'FINISHED', 6, false, '11:-1', '-1:11', '11:13', '6:11', NULL, 1, 3, 13, 112, 115, NULL, NULL, '2022-12-10 09:03:58.021102', '2022-12-10 12:14:55.579142');
INSERT INTO ttlive.game VALUES (67, 'FINISHED', 1, true, '-1:11', '11:-1', '-1:11', '-1:11', NULL, 1, 3, 7, NULL, NULL, 27, 30, '2022-12-02 20:23:54.851829', '2022-12-02 20:27:55.336074');
INSERT INTO ttlive.game VALUES (71, 'FINISHED', 5, false, '11:6', '2:11', '11:4', '7:11', '6:11', 2, 3, 7, 54, 59, NULL, NULL, '2022-12-02 20:23:54.857023', '2022-12-02 20:59:37.32534');
INSERT INTO ttlive.game VALUES (148, 'FINISHED', 8, false, '12:10', '11:5', '10:12', '11:8', NULL, 3, 1, 13, 110, 114, NULL, NULL, '2022-12-10 09:03:58.023436', '2022-12-10 12:48:07.169247');
INSERT INTO ttlive.game VALUES (147, 'FINISHED', 7, false, '9:11', '11:8', '10:12', '7:11', NULL, 1, 3, 13, 109, 113, NULL, NULL, '2022-12-10 09:03:58.022192', '2022-12-10 12:41:31.161059');
INSERT INTO ttlive.game VALUES (142, 'FINISHED', 2, true, '-1:11', '-1:11', '11:-1', '-1:11', NULL, 1, 3, 13, NULL, NULL, 57, 58, '2022-12-10 09:03:58.004269', '2022-12-10 11:38:05.835018');
INSERT INTO ttlive.game VALUES (141, 'FINISHED', 1, true, '11:-1', '-1:11', '11:-1', '11:-1', NULL, 3, 1, 13, NULL, NULL, 55, 56, '2022-12-10 09:03:58.000244', '2022-12-10 11:37:12.077377');
INSERT INTO ttlive.game VALUES (145, 'FINISHED', 5, false, '11:9', '11:5', '11:7', NULL, NULL, 3, 0, 13, 111, 116, NULL, NULL, '2022-12-10 09:03:58.016507', '2022-12-10 12:23:35.118604');
INSERT INTO ttlive.game VALUES (123, 'FINISHED', 3, false, '5:11', '11:5', '11:5', '11:9', NULL, 3, 1, 11, 93, 98, NULL, NULL, '2022-12-04 10:11:02.800423', '2022-12-04 12:33:19.348522');
INSERT INTO ttlive.game VALUES (110, 'FINISHED', 16, true, '10:12', '3:11', '7:11', NULL, NULL, 0, 3, 9, NULL, NULL, 37, 38, '2022-12-03 12:57:23.505399', '2022-12-03 13:08:32.645378');
INSERT INTO ttlive.game VALUES (100, 'FINISHED', 6, false, '9:11', '12:10', '13:11', '10:12', '11:9', 3, 2, 9, 75, 82, NULL, NULL, '2022-12-03 12:57:23.481949', '2022-12-03 13:04:38.458999');
INSERT INTO ttlive.game VALUES (101, 'FINISHED', 7, false, '12:10', '9:11', '11:7', '21:19', NULL, 3, 1, 9, 76, 81, NULL, NULL, '2022-12-03 12:57:23.485222', '2022-12-03 13:05:14.78894');
INSERT INTO ttlive.game VALUES (140, 'FINISHED', 10, false, '11:4', '7:11', '11:7', '13:11', NULL, 3, 1, 12, 104, 108, NULL, NULL, '2022-12-04 11:19:35.844032', '2022-12-04 16:26:57.31089');
INSERT INTO ttlive.game VALUES (125, 'FINISHED', 5, false, '11:7', '11:9', '9:11', '11:4', NULL, 3, 1, 11, 95, 100, NULL, NULL, '2022-12-04 10:11:02.803796', '2022-12-04 13:04:37.116279');
INSERT INTO ttlive.game VALUES (164, 'FINISHED', 4, false, '2:11', '3:11', '15:13', '8:11', NULL, 1, 3, 15, 126, 129, NULL, NULL, '2023-01-14 13:56:48.444746', '2023-01-14 14:57:45.125475');
INSERT INTO ttlive.game VALUES (130, 'FINISHED', 10, false, '8:11', '11:3', '10:12', '11:4', '8:11', 2, 3, 11, 96, 100, NULL, NULL, '2022-12-04 10:11:02.832357', '2022-12-17 14:32:03.798015');
INSERT INTO ttlive.game VALUES (131, 'FINISHED', 1, true, '-1:11', '11:-1', '11:-1', '11:-1', NULL, 3, 1, 12, NULL, NULL, 51, 52, '2022-12-04 11:19:35.834173', '2022-12-04 14:38:59.52489');
INSERT INTO ttlive.game VALUES (102, 'FINISHED', 8, false, '11:8', '11:8', '13:11', NULL, NULL, 3, 0, 9, 77, 84, NULL, NULL, '2022-12-03 12:57:23.488151', '2022-12-03 13:05:29.678065');
INSERT INTO ttlive.game VALUES (95, 'FINISHED', 1, true, '6:11', '6:11', '5:11', NULL, NULL, 0, 3, 9, NULL, NULL, 37, 40, '2022-12-03 12:57:23.461265', '2022-12-03 13:01:40.577617');
INSERT INTO ttlive.game VALUES (96, 'FINISHED', 2, true, '12:14', '10:12', '9:11', NULL, NULL, 0, 3, 9, NULL, NULL, 39, 38, '2022-12-03 12:57:23.465753', '2022-12-03 13:02:06.761552');
INSERT INTO ttlive.game VALUES (103, 'FINISHED', 9, false, '6:11', '3:11', '9:11', NULL, NULL, 0, 3, 9, 78, 83, NULL, NULL, '2022-12-03 12:57:23.491272', '2022-12-03 13:05:42.886638');
INSERT INTO ttlive.game VALUES (97, 'FINISHED', 3, true, '11:6', '4:11', '11:1', '11:6', NULL, 3, 1, 9, NULL, NULL, 41, 42, '2022-12-03 12:57:23.468087', '2022-12-03 13:02:40.514118');
INSERT INTO ttlive.game VALUES (104, 'FINISHED', 10, false, '9:11', '11:6', '9:11', '8:11', NULL, 1, 3, 9, 73, 79, NULL, NULL, '2022-12-03 12:57:23.493167', '2022-12-03 13:06:01.979411');
INSERT INTO ttlive.game VALUES (98, 'FINISHED', 4, false, '12:14', '8:11', '8:11', NULL, NULL, 0, 3, 9, 73, 80, NULL, NULL, '2022-12-03 12:57:23.475484', '2022-12-03 13:03:09.341028');
INSERT INTO ttlive.game VALUES (99, 'FINISHED', 5, false, '1:11', '11:13', '5:11', NULL, NULL, 0, 3, 9, 74, 79, NULL, NULL, '2022-12-03 12:57:23.47829', '2022-12-03 13:03:27.987609');
INSERT INTO ttlive.game VALUES (105, 'FINISHED', 11, false, '7:11', '11:5', '6:11', '12:14', NULL, 1, 3, 9, 74, 80, NULL, NULL, '2022-12-03 12:57:23.496718', '2022-12-03 13:06:23.132863');
INSERT INTO ttlive.game VALUES (106, 'FINISHED', 12, false, '3:11', '2:11', '12:14', NULL, NULL, 0, 3, 9, 75, 81, NULL, NULL, '2022-12-03 12:57:23.498518', '2022-12-03 13:06:37.531382');
INSERT INTO ttlive.game VALUES (139, 'FINISHED', 9, false, '14:12', '9:11', '11:6', '18:20', '11:9', 3, 2, 12, 103, 107, NULL, NULL, '2022-12-04 11:19:35.843606', '2022-12-04 16:22:27.728271');
INSERT INTO ttlive.game VALUES (107, 'FINISHED', 13, false, '11:5', '5:11', '11:9', '11:4', NULL, 3, 1, 9, 76, 82, NULL, NULL, '2022-12-03 12:57:23.499844', '2022-12-03 13:06:58.69911');
INSERT INTO ttlive.game VALUES (137, 'FINISHED', 7, false, '11:8', '4:11', '8:11', '8:11', NULL, 1, 3, 12, 101, 105, NULL, NULL, '2022-12-04 11:19:35.842193', '2022-12-04 15:39:36.157931');
INSERT INTO ttlive.game VALUES (138, 'FINISHED', 8, false, '7:11', '4:11', '11:6', '11:3', '11:9', 3, 2, 12, 102, 106, NULL, NULL, '2022-12-04 11:19:35.842726', '2022-12-04 15:59:03.816089');
INSERT INTO ttlive.game VALUES (108, 'FINISHED', 14, false, '10:12', '11:8', '9:11', '11:5', '11:6', 3, 2, 9, 77, 83, NULL, NULL, '2022-12-03 12:57:23.502765', '2022-12-03 13:07:24.516402');
INSERT INTO ttlive.game VALUES (109, 'FINISHED', 15, false, '13:11', '9:11', '11:8', '4:11', '11:6', 3, 2, 9, 78, 84, NULL, NULL, '2022-12-03 12:57:23.504327', '2022-12-03 13:08:06.328772');
INSERT INTO ttlive.game VALUES (135, 'FINISHED', 5, false, '11:-1', '11:-1', '11:8', NULL, NULL, 3, 0, 12, 103, 108, NULL, NULL, '2022-12-04 11:19:35.840873', '2022-12-04 15:19:34.696655');
INSERT INTO ttlive.game VALUES (133, 'FINISHED', 3, false, '11:-1', '11:-1', '11:-1', NULL, NULL, 3, 0, 12, 101, 106, NULL, NULL, '2022-12-04 11:19:35.837576', '2022-12-04 14:59:06.861542');
INSERT INTO ttlive.game VALUES (128, 'FINISHED', 8, false, '11:5', '11:5', '11:3', NULL, NULL, 3, 0, 11, 94, 98, NULL, NULL, '2022-12-04 10:11:02.828852', '2022-12-04 13:54:18.762361');
INSERT INTO ttlive.game VALUES (134, 'FINISHED', 4, false, '11:-1', '11:-1', '11:-1', NULL, NULL, 3, 0, 12, 102, 105, NULL, NULL, '2022-12-04 11:19:35.839337', '2022-12-04 14:59:08.719257');
INSERT INTO ttlive.game VALUES (121, 'FINISHED', 1, true, '13:11', '11:7', '11:2', NULL, NULL, 3, 0, 11, NULL, NULL, 47, 48, '2022-12-04 10:11:02.792428', '2022-12-04 11:54:47.125527');
INSERT INTO ttlive.game VALUES (136, 'FINISHED', 6, false, '-1:11', '11:2', '11:4', '11:3', NULL, 3, 1, 12, 104, 107, NULL, NULL, '2022-12-04 11:19:35.841735', '2022-12-04 15:26:00.407306');
INSERT INTO ttlive.game VALUES (129, 'FINISHED', 9, false, '11:7', '9:11', '11:5', '7:11', '13:11', 3, 2, 11, 95, 99, NULL, NULL, '2022-12-04 10:11:02.830674', '2022-12-04 14:14:51.222554');
INSERT INTO ttlive.game VALUES (163, 'FINISHED', 3, false, '13:11', '11:5', '8:11', '11:7', NULL, 3, 1, 15, 125, 130, NULL, NULL, '2023-01-14 13:56:48.441952', '2023-01-14 15:08:31.630596');
INSERT INTO ttlive.game VALUES (124, 'FINISHED', 4, false, '8:11', '11:7', '11:9', '11:9', NULL, 3, 1, 11, 94, 97, NULL, NULL, '2022-12-04 10:11:02.80217', '2022-12-04 12:59:23.787001');
INSERT INTO ttlive.game VALUES (150, 'FINISHED', 10, false, '11:7', '12:10', '10:12', '11:9', NULL, 3, 1, 13, 112, 116, NULL, NULL, '2022-12-10 09:03:58.036658', '2022-12-16 13:59:08.993984');
INSERT INTO ttlive.game VALUES (126, 'FINISHED', 6, false, '10:12', '11:4', '9:11', '11:6', '4:11', 2, 3, 11, 96, 99, NULL, NULL, '2022-12-04 10:11:02.80713', '2022-12-04 13:32:51.854338');
INSERT INTO ttlive.game VALUES (166, 'FINISHED', 6, false, '7:11', '12:10', '8:11', '9:11', NULL, 1, 3, 15, 128, 131, NULL, NULL, '2023-01-14 13:56:48.45496', '2023-01-14 15:31:49.039682');
INSERT INTO ttlive.game VALUES (132, 'FINISHED', 2, true, '11:-1', '11:-1', '-1:11', '-1:11', '-1:11', 2, 3, 12, NULL, NULL, 53, 54, '2022-12-04 11:19:35.836465', '2022-12-04 14:34:50.984968');
INSERT INTO ttlive.game VALUES (127, 'FINISHED', 7, false, '14:12', '11:8', '14:12', NULL, NULL, 3, 0, 11, 93, 97, NULL, NULL, '2022-12-04 10:11:02.808138', '2022-12-04 13:33:23.949795');
INSERT INTO ttlive.game VALUES (149, 'FINISHED', 9, false, '11:4', '9:11', '11:5', '11:6', NULL, 3, 1, 13, 111, 115, NULL, NULL, '2022-12-10 09:03:58.034641', '2022-12-10 13:10:53.578484');
INSERT INTO ttlive.game VALUES (122, 'FINISHED', 2, true, '5:11', '2:11', '11:9', '11:13', NULL, 1, 3, 11, NULL, NULL, 49, 50, '2022-12-04 10:11:02.796056', '2022-12-04 11:59:27.699942');
INSERT INTO ttlive.game VALUES (167, 'FINISHED', 7, false, '11:6', '5:11', '12:10', '8:11', '13:15', 2, 3, 15, 125, 129, NULL, NULL, '2023-01-14 13:56:48.456279', '2023-01-14 16:11:22.975824');
INSERT INTO ttlive.game VALUES (162, 'FINISHED', 2, true, '11:7', '11:1', '9:11', '11:6', NULL, 3, 1, 15, NULL, NULL, 65, 66, '2023-01-14 13:56:48.434653', '2023-01-14 14:17:34.848529');
INSERT INTO ttlive.game VALUES (161, 'FINISHED', 1, true, '9:11', '12:10', '8:11', '8:11', NULL, 1, 3, 15, NULL, NULL, 63, 64, '2023-01-14 13:56:48.431003', '2023-01-14 14:23:38.702271');
INSERT INTO ttlive.game VALUES (165, 'FINISHED', 5, false, '7:11', '5:11', '5:11', NULL, NULL, 0, 3, 15, 127, 132, NULL, NULL, '2023-01-14 13:56:48.450049', '2023-01-14 15:18:10.829911');
INSERT INTO ttlive.game VALUES (198, 'FINISHED', 8, false, '-1:11', '-1:11', '-1:11', NULL, NULL, 0, 3, 18, 150, 154, NULL, NULL, '2023-01-26 19:09:39.435488', '2023-01-26 21:38:48.260945');
INSERT INTO ttlive.game VALUES (207, 'FINISHED', 7, false, '11:-1', '11:-1', '11:-1', NULL, NULL, 3, 0, 19, 157, 161, NULL, NULL, '2023-02-11 12:38:07.141288', '2023-02-11 16:42:35.910926');
INSERT INTO ttlive.game VALUES (208, 'FINISHED', 8, false, '11:-1', '-1:11', '11:-1', '-1:11', '-1:11', 2, 3, 19, 158, 162, NULL, NULL, '2023-02-11 12:38:07.142541', '2023-02-11 16:35:48.194055');
INSERT INTO ttlive.game VALUES (168, 'FINISHED', 8, false, '11:4', '11:9', '11:7', NULL, NULL, 3, 0, 15, 126, 130, NULL, NULL, '2023-01-14 13:56:48.467315', '2023-01-14 15:52:59.936151');
INSERT INTO ttlive.game VALUES (190, 'FINISHED', 10, false, '9:11', '7:11', '11:5', '10:12', NULL, 1, 3, 17, 144, 148, NULL, NULL, '2023-01-15 10:46:17.838675', '2023-01-15 16:10:47.583052');
INSERT INTO ttlive.game VALUES (199, 'FINISHED', 9, false, '-1:11', '-1:11', '-1:11', NULL, NULL, 0, 3, 18, 151, 155, NULL, NULL, '2023-01-26 19:09:39.436108', '2023-01-26 22:00:47.904088');
INSERT INTO ttlive.game VALUES (187, 'FINISHED', 7, false, '11:2', '3:11', '11:9', '12:10', NULL, 3, 1, 17, 141, 145, NULL, NULL, '2023-01-15 10:46:17.83677', '2023-01-15 15:47:36.748014');
INSERT INTO ttlive.game VALUES (169, 'FINISHED', 9, false, '11:3', '11:5', '6:11', '11:7', NULL, 3, 1, 15, 127, 131, NULL, NULL, '2023-01-14 13:56:48.472404', '2023-01-14 16:20:23.4878');
INSERT INTO ttlive.game VALUES (180, 'FINISHED', 10, false, '-1:11', '-1:11', '-1:11', NULL, NULL, 0, 3, 16, 136, 140, NULL, NULL, '2023-01-15 09:55:38.430597', '2023-01-15 13:07:14.176009');
INSERT INTO ttlive.game VALUES (184, 'FINISHED', 4, false, '6:11', '1:11', '2:11', NULL, NULL, 0, 3, 17, 142, 145, NULL, NULL, '2023-01-15 10:46:17.83345', '2023-01-15 14:53:09.753423');
INSERT INTO ttlive.game VALUES (176, 'FINISHED', 6, false, '11:8', '11:8', '11:-1', NULL, NULL, 3, 0, 16, 136, 139, NULL, NULL, '2023-01-15 09:55:38.427911', '2023-01-15 14:07:04.071373');
INSERT INTO ttlive.game VALUES (200, 'FINISHED', 10, false, '-1:11', '-1:11', '-1:11', NULL, NULL, 0, 3, 18, 152, 156, NULL, NULL, '2023-01-26 19:09:39.440015', '2023-01-26 22:01:46.797122');
INSERT INTO ttlive.game VALUES (175, 'FINISHED', 5, false, '6:11', '11:6', '-1:11', '-1:11', NULL, 1, 3, 16, 135, 140, NULL, NULL, '2023-01-15 09:55:38.424906', '2023-01-15 14:07:19.960384');
INSERT INTO ttlive.game VALUES (193, 'FINISHED', 3, false, '-1:11', '-1:11', '11:-1', '11:-1', '-1:11', 2, 3, 18, 149, 154, NULL, NULL, '2023-01-26 19:09:39.428627', '2023-01-26 20:56:16.778778');
INSERT INTO ttlive.game VALUES (171, 'FINISHED', 1, true, '10:12', '11:5', '11:9', '9:11', '11:9', 3, 2, 16, NULL, NULL, 67, 68, '2023-01-15 09:55:38.411849', '2023-01-15 11:29:42.628596');
INSERT INTO ttlive.game VALUES (172, 'FINISHED', 2, true, '6:11', '11:6', '4:11', '11:8', '11:9', 3, 2, 16, NULL, NULL, 69, 70, '2023-01-15 09:55:38.414615', '2023-01-15 11:29:53.220688');
INSERT INTO ttlive.game VALUES (182, 'FINISHED', 2, true, '9:11', '11:0', '12:10', '8:11', '8:11', 2, 3, 17, NULL, NULL, 73, 74, '2023-01-15 10:46:17.827279', '2023-01-15 14:55:11.019395');
INSERT INTO ttlive.game VALUES (191, 'FINISHED', 1, true, '-1:11', '11:-1', '11:-1', '-1:11', '-1:11', 2, 3, 18, NULL, NULL, 75, 76, '2023-01-26 19:09:39.420796', '2023-01-26 20:25:00.01613');
INSERT INTO ttlive.game VALUES (173, 'FINISHED', 3, false, '11:9', '11:4', '12:10', NULL, NULL, 3, 0, 16, 133, 138, NULL, NULL, '2023-01-15 09:55:38.421533', '2023-01-15 11:51:06.598495');
INSERT INTO ttlive.game VALUES (174, 'FINISHED', 4, false, '8:11', '10:12', '10:12', NULL, NULL, 0, 3, 16, 134, 137, NULL, NULL, '2023-01-15 09:55:38.423518', '2023-01-15 11:51:21.795627');
INSERT INTO ttlive.game VALUES (202, 'FINISHED', 2, true, '-1:11', '-1:11', '-1:11', NULL, NULL, 0, 3, 19, NULL, NULL, 81, 82, '2023-02-11 12:38:07.128464', '2023-02-11 15:20:36.923688');
INSERT INTO ttlive.game VALUES (183, 'FINISHED', 3, false, '11:13', '8:11', '8:11', NULL, NULL, 0, 3, 17, 141, 146, NULL, NULL, '2023-01-15 10:46:17.831999', '2023-01-15 14:59:04.646471');
INSERT INTO ttlive.game VALUES (192, 'FINISHED', 2, true, '5:11', '11:-1', '11:-1', '11:-1', NULL, 3, 1, 18, NULL, NULL, 77, 78, '2023-01-26 19:09:39.42334', '2023-01-26 20:25:14.002873');
INSERT INTO ttlive.game VALUES (195, 'FINISHED', 5, false, '11:-1', '11:-1', '11:-1', NULL, NULL, 3, 0, 18, 151, 156, NULL, NULL, '2023-01-26 19:09:39.432305', '2023-01-26 21:07:50.74822');
INSERT INTO ttlive.game VALUES (170, 'FINISHED', 10, false, '11:9', '5:11', '4:11', '7:11', NULL, 1, 3, 15, 128, 132, NULL, NULL, '2023-01-14 13:56:48.475094', '2023-01-14 16:27:40.871232');
INSERT INTO ttlive.game VALUES (210, 'FINISHED', 10, false, '-1:11', '-1:11', '-1:11', NULL, NULL, 0, 3, 19, 160, 164, NULL, NULL, '2023-02-11 12:38:07.144186', '2023-02-11 16:35:53.387561');
INSERT INTO ttlive.game VALUES (31, 'FINISHED', 1, true, '8:11', '13:11', '5:11', '11:9', '11:5', 3, 2, 4, NULL, NULL, 13, 14, '2022-11-20 00:00:48.064832', '2023-02-02 17:22:32.082564');
INSERT INTO ttlive.game VALUES (181, 'FINISHED', 1, true, '0:11', '9:11', '9:11', NULL, NULL, 0, 3, 17, NULL, NULL, 71, 72, '2023-01-15 10:46:17.825011', '2023-01-15 14:34:14.993497');
INSERT INTO ttlive.game VALUES (189, 'FINISHED', 9, false, '9:11', '11:9', '11:9', '11:7', NULL, 3, 1, 17, 143, 147, NULL, NULL, '2023-01-15 10:46:17.838159', '2023-01-15 16:18:07.686952');
INSERT INTO ttlive.game VALUES (185, 'FINISHED', 5, false, '2:11', '6:11', '8:11', NULL, NULL, 0, 3, 17, 143, 148, NULL, NULL, '2023-01-15 10:46:17.834762', '2023-01-15 15:50:46.048238');
INSERT INTO ttlive.game VALUES (188, 'FINISHED', 8, false, '5:11', '5:11', '9:11', NULL, NULL, 0, 3, 17, 142, 146, NULL, NULL, '2023-01-15 10:46:17.837355', '2023-01-15 15:51:04.882366');
INSERT INTO ttlive.game VALUES (178, 'FINISHED', 8, false, '11:6', '11:2', '11:8', NULL, NULL, 3, 0, 16, 134, 138, NULL, NULL, '2023-01-15 09:55:38.429337', '2023-01-15 12:34:38.638151');
INSERT INTO ttlive.game VALUES (186, 'FINISHED', 6, false, '12:10', '11:9', '11:9', NULL, NULL, 3, 0, 17, 144, 147, NULL, NULL, '2023-01-15 10:46:17.83616', '2023-01-15 15:24:43.971875');
INSERT INTO ttlive.game VALUES (179, 'FINISHED', 9, false, '11:-1', '11:-1', '11:-1', NULL, NULL, 3, 0, 16, 135, 139, NULL, NULL, '2023-01-15 09:55:38.430068', '2023-01-15 12:58:19.035198');
INSERT INTO ttlive.game VALUES (177, 'FINISHED', 7, false, '11:7', '10:12', '11:8', '8:11', '11:-1', 3, 2, 16, 133, 137, NULL, NULL, '2023-01-15 09:55:38.42854', '2023-01-15 12:58:20.266953');
INSERT INTO ttlive.game VALUES (194, 'FINISHED', 4, false, '11:-1', '-1:11', '11:-1', '11:-1', NULL, 3, 1, 18, 150, 153, NULL, NULL, '2023-01-26 19:09:39.430818', '2023-01-26 20:43:40.054781');
INSERT INTO ttlive.game VALUES (196, 'FINISHED', 6, false, '11:-1', '-1:11', '-1:11', '-1:11', NULL, 1, 3, 18, 152, 155, NULL, NULL, '2023-01-26 19:09:39.434105', '2023-01-26 21:37:10.593169');
INSERT INTO ttlive.game VALUES (197, 'FINISHED', 7, false, '-1:11', '-1:11', '11:-1', '11:-1', '-1:11', 2, 3, 18, 149, 153, NULL, NULL, '2023-01-26 19:09:39.434846', '2023-01-26 21:37:22.633322');
INSERT INTO ttlive.game VALUES (201, 'FINISHED', 1, true, '11:-1', '11:-1', '11:-1', NULL, NULL, 3, 0, 19, NULL, NULL, 79, 80, '2023-02-11 12:38:07.125143', '2023-02-11 15:20:33.265304');
INSERT INTO ttlive.game VALUES (206, 'FINISHED', 6, false, '-1:11', '-1:11', '-1:11', NULL, NULL, 0, 3, 19, 160, 163, NULL, NULL, '2023-02-11 12:38:07.139058', '2023-02-11 15:52:46.777359');
INSERT INTO ttlive.game VALUES (203, 'FINISHED', 3, false, '11:-1', '11:-1', '11:-1', NULL, NULL, 3, 0, 19, 157, 162, NULL, NULL, '2023-02-11 12:38:07.133802', '2023-02-11 15:41:26.197481');
INSERT INTO ttlive.game VALUES (205, 'FINISHED', 5, false, '11:-1', '11:-1', '11:-1', NULL, NULL, 3, 0, 19, 159, 164, NULL, NULL, '2023-02-11 12:38:07.136277', '2023-02-11 15:59:59.152815');
INSERT INTO ttlive.game VALUES (209, 'FINISHED', 9, false, '11:-1', '11:-1', '11:-1', NULL, NULL, 3, 0, 19, 159, 163, NULL, NULL, '2023-02-11 12:38:07.143373', '2023-02-11 16:42:20.146123');
INSERT INTO ttlive.game VALUES (213, 'FINISHED', 3, false, '12:14', '11:8', '11:7', '7:11', '13:11', 3, 2, 20, 165, 170, NULL, NULL, '2023-02-12 09:27:46.933378', '2023-02-12 12:49:11.319477');
INSERT INTO ttlive.game VALUES (215, 'FINISHED', 5, false, '11:3', '11:9', '11:8', NULL, NULL, 3, 0, 20, 167, 172, NULL, NULL, '2023-02-12 09:27:46.937677', '2023-02-12 13:12:17.181651');
INSERT INTO ttlive.game VALUES (204, 'FINISHED', 4, false, '11:-1', '11:-1', '-1:11', '-1:11', '-1:11', 2, 3, 19, 158, 161, NULL, NULL, '2023-02-11 12:38:07.135152', '2023-02-11 15:51:38.380585');
INSERT INTO ttlive.game VALUES (216, 'FINISHED', 6, false, '11:6', '11:9', '11:8', NULL, NULL, 3, 0, 20, 168, 171, NULL, NULL, '2023-02-12 09:27:46.942681', '2023-02-12 13:15:21.942875');
INSERT INTO ttlive.game VALUES (218, 'FINISHED', 8, false, '4:11', '11:3', '11:8', '11:3', NULL, 3, 1, 20, 166, 170, NULL, NULL, '2023-02-12 09:27:46.94438', '2023-02-12 13:38:21.319557');
INSERT INTO ttlive.game VALUES (217, 'FINISHED', 7, false, '11:6', '11:1', '7:11', '11:5', NULL, 3, 1, 20, 165, 169, NULL, NULL, '2023-02-12 09:27:46.943775', '2023-02-12 13:38:06.886416');
INSERT INTO ttlive.game VALUES (221, 'FINISHED', 1, true, '11:-1', '11:-1', '11:-1', NULL, NULL, 3, 0, 21, NULL, NULL, 87, 88, '2023-02-12 13:49:27.782902', '2023-02-12 15:24:45.081603');
INSERT INTO ttlive.game VALUES (220, 'FINISHED', 10, false, '12:10', '11:9', '11:4', NULL, NULL, 3, 0, 20, 168, 172, NULL, NULL, '2023-02-12 09:27:46.945648', '2023-02-13 22:01:51.745001');
INSERT INTO ttlive.game VALUES (211, 'FINISHED', 1, true, '11:7', '11:9', '11:1', NULL, NULL, 3, 0, 20, NULL, NULL, 83, 84, '2023-02-12 09:27:46.925261', '2023-02-12 11:51:23.238445');
INSERT INTO ttlive.game VALUES (214, 'FINISHED', 4, false, '12:14', '11:8', '11:5', '11:8', NULL, 3, 1, 20, 166, 169, NULL, NULL, '2023-02-12 09:27:46.93573', '2023-02-12 12:45:20.60854');
INSERT INTO ttlive.game VALUES (212, 'FINISHED', 2, true, '11:4', '4:11', '9:11', '11:8', '11:6', 3, 2, 20, NULL, NULL, 85, 86, '2023-02-12 09:27:46.928228', '2023-02-12 12:09:46.862871');
INSERT INTO ttlive.game VALUES (219, 'FINISHED', 9, false, '11:9', '15:13', '11:7', NULL, NULL, 3, 0, 20, 167, 171, NULL, NULL, '2023-02-12 09:27:46.945157', '2023-02-12 14:05:11.797373');
INSERT INTO ttlive.game VALUES (222, 'FINISHED', 2, true, '-1:11', '-1:11', '-1:11', NULL, NULL, 0, 3, 21, NULL, NULL, 89, 90, '2023-02-12 13:49:27.784524', '2023-02-12 15:29:02.467989');
INSERT INTO ttlive.game VALUES (223, 'FINISHED', 3, false, '-1:11', '-1:11', '11:-1', '-1:11', NULL, 1, 3, 21, 173, 178, NULL, NULL, '2023-02-12 13:49:27.787312', '2023-02-12 16:03:10.118385');
INSERT INTO ttlive.game VALUES (224, 'FINISHED', 4, false, '11:-1', '-1:11', '11:-1', '11:-1', NULL, 3, 1, 21, 174, 177, NULL, NULL, '2023-02-12 13:49:27.788381', '2023-02-12 16:08:26.832741');
INSERT INTO ttlive.game VALUES (225, 'FINISHED', 5, false, '11:-1', '11:-1', '11:-1', NULL, NULL, 3, 0, 21, 175, 180, NULL, NULL, '2023-02-12 13:49:27.789371', '2023-02-12 16:28:11.842041');
INSERT INTO ttlive.game VALUES (227, 'FINISHED', 7, false, '11:-1', '11:-1', '-1:11', '11:-1', NULL, 3, 1, 21, 173, 177, NULL, NULL, '2023-02-12 13:49:27.791114', '2023-02-12 17:01:18.408541');
INSERT INTO ttlive.game VALUES (229, 'FINISHED', 9, false, '11:-1', '11:-1', '11:-1', NULL, NULL, 3, 0, 21, 175, 179, NULL, NULL, '2023-02-12 13:49:27.794182', '2023-02-12 17:29:02.080571');
INSERT INTO ttlive.game VALUES (230, 'FINISHED', 10, false, '-1:11', '-1:11', '-1:11', NULL, NULL, 0, 3, 21, 176, 180, NULL, NULL, '2023-02-12 13:49:27.795387', '2023-02-12 17:29:03.741238');
INSERT INTO ttlive.game VALUES (226, 'FINISHED', 6, false, '-1:11', '-1:11', '-1:11', NULL, NULL, 0, 3, 21, 176, 179, NULL, NULL, '2023-02-12 13:49:27.79051', '2023-02-12 17:29:21.631674');
INSERT INTO ttlive.game VALUES (228, 'FINISHED', 8, false, '11:-1', '-1:11', '11:-1', '11:-1', NULL, 3, 1, 21, 174, 178, NULL, NULL, '2023-02-12 13:49:27.791516', '2023-02-12 17:29:24.58995');


--
-- Name: account_id_seq; Type: SEQUENCE SET; Schema: ttlive; Owner: ttlive
--

SELECT pg_catalog.setval('ttlive.account_id_seq', 2, true);


--
-- Name: action_log_id_seq; Type: SEQUENCE SET; Schema: ttlive; Owner: ttlive
--

SELECT pg_catalog.setval('ttlive.action_log_id_seq', 1, false);


--
-- Name: chat_message_id_seq; Type: SEQUENCE SET; Schema: ttlive; Owner: ttlive
--

SELECT pg_catalog.setval('ttlive.chat_message_id_seq', 52, true);


--
-- Name: contact_id_seq; Type: SEQUENCE SET; Schema: ttlive; Owner: ttlive
--

SELECT pg_catalog.setval('ttlive.contact_id_seq', 1, false);


--
-- Name: doubles_id_seq; Type: SEQUENCE SET; Schema: ttlive; Owner: ttlive
--

SELECT pg_catalog.setval('ttlive.doubles_id_seq', 90, true);


--
-- Name: game_id_seq; Type: SEQUENCE SET; Schema: ttlive; Owner: ttlive
--

SELECT pg_catalog.setval('ttlive.game_id_seq', 230, true);


--
-- Name: game_style_id_seq; Type: SEQUENCE SET; Schema: ttlive; Owner: ttlive
--

SELECT pg_catalog.setval('ttlive.game_style_id_seq', 4, true);


--
-- Name: league_id_seq; Type: SEQUENCE SET; Schema: ttlive; Owner: ttlive
--

SELECT pg_catalog.setval('ttlive.league_id_seq', 57, true);


--
-- Name: match_id_seq; Type: SEQUENCE SET; Schema: ttlive; Owner: ttlive
--

SELECT pg_catalog.setval('ttlive.match_id_seq', 21, true);


--
-- Name: player_id_seq; Type: SEQUENCE SET; Schema: ttlive; Owner: ttlive
--

SELECT pg_catalog.setval('ttlive.player_id_seq', 180, true);


--
-- Name: region_id_seq; Type: SEQUENCE SET; Schema: ttlive; Owner: ttlive
--

SELECT pg_catalog.setval('ttlive.region_id_seq', 17, true);


--
-- Name: team_id_seq; Type: SEQUENCE SET; Schema: ttlive; Owner: ttlive
--

SELECT pg_catalog.setval('ttlive.team_id_seq', 44, true);


--
-- PostgreSQL database dump complete
--

