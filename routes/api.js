const express = require("express");
const passport = require("passport");
const router = express.Router();
const UserController = require("../controllers/usersController");
const authMiddleware = require("../middleware/authMiddleware");
const UsersController = require("../controllers/usersController");

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operaciones relacionadas con usuarios
 *
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión como usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error en el servidor
 */
router.post("/login", UserController.login);

/**
 * @swagger
 * /me:
 *  get:
 *   summary: Obtiene los detalles del usuario autenticado
 *   tags: [Usuarios]
 *   responses:
 *     200:
 *       description: Detalles del usuario
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUsuarios:
 *                 type: integer
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *     401:
 *       description: No autorizado
 *     500:
 *       description: Error en el servidor
 */
router.get("/me", authMiddleware, UserController.getMe);

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Obtiene una lista de clientes
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         default: 20
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         default: 0
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idClientes:
 *                     type: integer
 *                   nomeCliente:
 *                     type: string
 *                   email:
 *                     type: string
 *       404:
 *         description: Ningún cliente localizado.
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Obtiene los detalles de un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del Cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idClientes:
 *                   type: integer
 *                 nomeCliente:
 *                   type: string
 *                 email:
 *                   type: string
 *                 ordensServicos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idOs:
 *                         type: integer
 *                       descricaoProduto:
 *                         type: string
 *                       dataCadastro:
 *                         type: string
 *                         format: date-time
 *                       valorTotal:
 *                         type: number
 *                         format: float
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error en el servidor
 */
// Rutas de clientes
router.get(
  "/users",
  passport.authenticate("jwt-cliente", { session: false }),
  UserController.getUsers
);
router.get(
  "/users/:id",
  passport.authenticate("jwt-cliente", { session: false }),
  UserController.getUsers
);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeCliente:
 *                 type: string
 *               documento:
 *                 type: string
 *               senha:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente añadido con éxito
 *       500:
 *         description: Error en el servidor
 */
router.post(
  "/users",
  passport.authenticate("jwt-cliente", { session: false }),
  UserController.createUser
);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Actualiza un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeCliente:
 *                 type: string
 *               documento:
 *                 type: string
 *               senha:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente editado con éxito
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put(
  "/users/:id",
  passport.authenticate("jwt-cliente", { session: false }),
  UsersController.updateUser
);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Elimina un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente eliminado con éxito
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete(
  "/users/:id",
  passport.authenticate("jwt-cliente", { session: false }),
  UserController.deleteUser
);

/**
 * @swagger
 * /clientes/os/{id}:
 *   get:
 *     summary: Obtiene las órdenes de servicio de un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ordenes de servicio del cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idOs:
 *                     type: integer
 *                   descricaoProduto:
 *                     type: string
 *                   dataCadastro:
 *                     type: string
 *                     format: date-time
 *                   valorTotal:
 *                     type: number
 *                     format: float
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error en el servidor
 */

module.exports = router;
