import { db } from "../config/db.js";
import { favoritesTable } from "../database/schema.js";
import { and, eq } from 'drizzle-orm';


export const addFavorite = async(req, res)=>{
    try{
        const { userId, recipeId, title, image, cookTime, servings } = req.body;
        if(!userId || !recipeId || !title){
            return res.status(400).json({error: "missing required fields"});
        }
        const newFavorite = await db.insert(favoritesTable).values({
            userId,
            recipeId, 
            title,
            image,
            cookTime,
            servings
        }).returning();
        res.status(201).json(newFavorite[0]);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "something went wrong"});
    }
}

export const deleteFavorite = async (req, res)=>{
    try{
        const {userId, recipeId} = req.params;
        await db.delete(favoritesTable).where(
            and(eq(favoritesTable.userId, userId), eq(favoritesTable.recipeId, recipeId))
        );
        res.status(200).json({message: "favorite deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "something went wrong"});
    }
}

export const fetchFavorites = async (req, res)=>{
    try{
        const { userId } = req.params;
        const favorites = await db.
        select()
        .from(favoritesTable)
        .where(eq(favoritesTable.userId, userId));
        res.json(favorites);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "something went wrong"});
    }
}