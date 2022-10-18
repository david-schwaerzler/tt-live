INSERT INTO ttlive.match (id, title, description, home_team_score, guest_team_score, editorcode, code, league_id, home_team_id, guest_team_id, game_style_id, account_id, created_at, modified_at) VALUES 
(1, '', '', 4, 1, '21g7ot', 'zm43v1', 1, 3, 11, 1, NULL, '2022-10-19 00:26:30.799099', '2022-10-19 00:26:30.799817');

INSERT INTO ttlive.doubles (id, "position", is_home_team, player_1, player_2, match_id) VALUES (1, 1, true, 'Ackermann Tim', 'Meyhöfer Morris ', 1);
INSERT INTO ttlive.doubles (id, "position", is_home_team, player_1, player_2, match_id) VALUES (2, 1, false, 'Louis Arne', 'Herzog Julian', 1);
INSERT INTO ttlive.doubles (id, "position", is_home_team, player_1, player_2, match_id) VALUES (3, 2, true, 'Fründt Wolfgang', 'Wendt Johan', 1);
INSERT INTO ttlive.doubles (id, "position", is_home_team, player_1, player_2, match_id) VALUES (4, 2, false, 'Reinhardt Finn Philip', 'Thüne Nisse', 1);

INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (1, 'Louis Arne', 1, true, '2022-10-19 00:26:30.822851', '2022-10-19 00:26:30.822892', 1);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (2, 'Ackermann Tim', 2, true, '2022-10-19 00:26:30.828682', '2022-10-19 00:26:30.828706', 1);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (3, 'Meyhöfer Morris', 3, true, '2022-10-19 00:26:30.832433', '2022-10-19 00:26:30.832458', 1);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (4, 'Bremer Tim', 4, true, '2022-10-19 00:26:30.836822', '2022-10-19 00:26:30.836846', 1);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (5, 'Thüne Nisse', 1, false, '2022-10-19 00:26:30.848047', '2022-10-19 00:26:30.848069', 1);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (6, 'Reinhardt Finn Philip', 2, false, '2022-10-19 00:26:30.849887', '2022-10-19 00:26:30.849914', 1);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (7, 'Wendt Johan', 3, false, '2022-10-19 00:26:30.852511', '2022-10-19 00:26:30.852536', 1);
INSERT INTO ttlive.player (id, name, "position", is_home_team, created_at, modified_at, match_id) VALUES (8, 'Fründt Wolfgang', 4, false, '2022-10-19 00:26:30.854056', '2022-10-19 00:26:30.854077', 1);

INSERT INTO ttlive.game (id, game_number, is_double, set1, set2, set3, set4, set5, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(1, 1, true, '11:5', '11:8', '11:6', NULL, NULL, 1, NULL, NULL, 1, 2, '2022-10-19 00:26:30.816603', '2022-10-19 00:26:30.816636');
INSERT INTO ttlive.game (id, game_number, is_double, set1, set2, set3, set4, set5, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(2, 2, true, '11:3', '11:8', '6:11', '11:6', NULL, 1, NULL, NULL, 3, 4, '2022-10-19 00:26:30.819457', '2022-10-19 00:26:30.819495');
INSERT INTO ttlive.game (id, game_number, is_double, set1, set2, set3, set4, set5, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(3, 3, false, '9:11', '11:5', '13:11', '11:9', NULL, 1, 1, 6, NULL, NULL, '2022-10-19 00:26:30.826632', '2022-10-19 00:26:30.8656');
INSERT INTO ttlive.game (id, game_number, is_double, set1, set2, set3, set4, set5, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(4, 4, false, '11:5', '11:9', '7:11', '6:11', '10:12', 1, 2, 5, NULL, NULL, '2022-10-19 00:26:30.830755', '2022-10-19 00:26:30.86895');
INSERT INTO ttlive.game (id, game_number, is_double, set1, set2, set3, set4, set5, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(5, 5, false, '11:6', '11:6', '3:11', '11:2', NULL, 1, 3, 8, NULL, NULL, '2022-10-19 00:26:30.834396', '2022-10-19 00:26:30.870203');
INSERT INTO ttlive.game (id, game_number, is_double, set1, set2, set3, set4, set5, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(6, 6, false, NULL, NULL, NULL, NULL, NULL, 1, 4, 7, NULL, NULL, '2022-10-19 00:26:30.838306', '2022-10-19 00:26:30.871302');
INSERT INTO ttlive.game (id, game_number, is_double, set1, set2, set3, set4, set5, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(7, 7, false, NULL, NULL, NULL, NULL, NULL, 1, 1, 5, NULL, NULL, '2022-10-19 00:26:30.84044', '2022-10-19 00:26:30.87229');
INSERT INTO ttlive.game (id, game_number, is_double, set1, set2, set3, set4, set5, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(8, 8, false, NULL, NULL, NULL, NULL, NULL, 1, 2, 6, NULL, NULL, '2022-10-19 00:26:30.84268', '2022-10-19 00:26:30.873691');
INSERT INTO ttlive.game (id, game_number, is_double, set1, set2, set3, set4, set5, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(9, 9, false, NULL, NULL, NULL, NULL, NULL, 1, 3, 7, NULL, NULL, '2022-10-19 00:26:30.844528', '2022-10-19 00:26:30.877327');
INSERT INTO ttlive.game (id, game_number, is_double, set1, set2, set3, set4, set5, match_id, home_player_id, guest_player_id, home_doubles_id, guest_doubles_id, created_at, modified_at) VALUES 
(10, 10, false, NULL, NULL, NULL, NULL, NULL, 1, 4, 8, NULL, NULL, '2022-10-19 00:26:30.846272', '2022-10-19 00:26:30.878881');

SELECT pg_catalog.setval('ttlive.doubles_id_seq', 4, true);
SELECT pg_catalog.setval('ttlive.game_id_seq', 10, true);
SELECT pg_catalog.setval('ttlive.match_id_seq', 1, true);
SELECT pg_catalog.setval('ttlive.player_id_seq', 8, true);