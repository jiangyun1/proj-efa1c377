/*
 Navicat Premium Data Transfer

 Source Server         : koa-mysql
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : punch

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 17/04/2022 19:02:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `finish_times` int NULL DEFAULT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activity
-- ----------------------------
INSERT INTO `activity` VALUES (2, NULL, '刷牙洗脸擦擦擦擦啊啊啊啊啊啊', '1', 1, '2022-04-15 22:12:37');
INSERT INTO `activity` VALUES (3, NULL, '测试CAS', '1', 1, '2022-04-15 22:15:10');

-- ----------------------------
-- Table structure for other_activity
-- ----------------------------
DROP TABLE IF EXISTS `other_activity`;
CREATE TABLE `other_activity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `activity_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `detail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` datetime NOT NULL,
  `limit` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of other_activity
-- ----------------------------
INSERT INTO `other_activity` VALUES (2, '活动2', '根据《关于“大学生志愿服务西部计划”志愿者报考硕士研究生享受优惠政策的通知》（教学厅〔2004〕18号）《关于统筹实施引导高校毕业生到农村基层服务项目工作的通知》（人社部发〔2009〕42号）等有关文件的规定：“服务2年以上且考核合格的，服务期满后3年内报考硕士研究生的，初试总分加10分，同等条件下优先录取。”', '2022-04-16 00:59:49', 99);
INSERT INTO `other_activity` VALUES (3, '测试', '测试11123213241324', '2022-04-16 00:59:49', 99);

-- ----------------------------
-- Table structure for relation
-- ----------------------------
DROP TABLE IF EXISTS `relation`;
CREATE TABLE `relation`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `activityId` int NOT NULL,
  `agree` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  INDEX `activityId`(`activityId`) USING BTREE,
  CONSTRAINT `relation_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `relation_ibfk_2` FOREIGN KEY (`activityId`) REFERENCES `other_activity` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of relation
-- ----------------------------
INSERT INTO `relation` VALUES (5, 7, 2, 0);
INSERT INTO `relation` VALUES (6, 7, 2, 0);
INSERT INTO `relation` VALUES (7, 7, 3, 0);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, 'user');
INSERT INTO `role` VALUES (2, 'manage');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `salt` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `roleId` int NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `summary` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `roleId`(`roleId`) USING BTREE,
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'xc', 'xybbpassword', 'acbda', 1, '张三', '帅气');
INSERT INTO `user` VALUES (2, 'aa', 'e843d5eb5b07fe91801987955f0924cd', '9f544dbc-4f01-42d4-b55d-5ae6c1fe94e2', 1, '李四', '威猛');
INSERT INTO `user` VALUES (3, 'see', '19e9806453abbfe8475eb8b638106cd2', '0627db34-790a-4c4e-9e41-723292bf3179', 1, '王五', '霸气');
INSERT INTO `user` VALUES (4, 'xgg', '3d16bf9941d10050eb767feeb6917389', '9cd08703-adbb-4321-b9ac-29942b0cc0ec', 1, NULL, NULL);
INSERT INTO `user` VALUES (5, '13648799855', 'dc3990519ea3769910d307e7b4e83cf2', 'a37d1c7d-2012-4d30-95a8-6f1d4d62c252', 1, NULL, NULL);
INSERT INTO `user` VALUES (6, '21212121212', '29ef168f874b3bb3fd3e3b41568aed38', 'ac4d15c0-3ae1-4559-be6f-dacfddd0ce4e', 1, NULL, NULL);
INSERT INTO `user` VALUES (7, '1', 'f6c272385d4d53d05281e643b4ec5b20', '42b26e94-a52d-4456-84e5-22ae0f64caf4', 1, NULL, NULL);
INSERT INTO `user` VALUES (8, '12', '98966f9d137c9c7a5e145b76d4090f03', '313078ad-45ff-402a-9b57-d4e9ab96b2e4', 1, NULL, NULL);
INSERT INTO `user` VALUES (9, '2', 'f6c272385d4d53d05281e643b4ec5b20', '42b26e94-a52d-4456-84e5-22ae0f64caf4', 2, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
