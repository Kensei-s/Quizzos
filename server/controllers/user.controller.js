import db from "../lib/database.js";
import * as schema from "../lib/schema/realtime.js";
import { eq } from "drizzle-orm";

const sendResponse = (res, status, message) => {
  res.status(status).json({ message });
};

export const findUser = async (req, res) => {
  try {
    const user = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, req.user.id))
      .get();

    if (!user) {
      return sendResponse(res, 404, "Non trouvé : Utilisateur introuvable.");
    }

    res.status(200).json(user);
  } catch (error) {
    sendResponse(
      res,
      400,
      "Requête incorrecte : Impossible de récupérer l'utilisateur."
    );
  }
};

export const setUserSocketId = async (req, res) => {
  try {
    const user = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, req.body.userId))
      .get();
    if (!user) {
      return sendResponse(res, 404, "Non trouvé : Utilisateur introuvable.");
    }
    const updatedUser = await db
      .update(schema.users)
      .set({ socketId: req.body.socket_id })
      .where(eq(schema.users.id, user.id))
      .returning({
        id: schema.users.id,
        socketId: schema.users.socketId,
        display_name: schema.users.display_name,
        email: schema.users.email,
      });
    res.status(200).json(updatedUser);
  } catch (error) {
    sendResponse(
      res,
      400,
      "Requête incorrecte : Impossible de mettre à jour l'utilisateur."
    );
  }
};
