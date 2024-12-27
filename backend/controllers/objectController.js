const ObjectModel = require('../models/object');

// Ajouter un objet
exports.addObject = async (req, res) => {
  try {
    const { name, description,imageUrl } = req.body;
    const newObject = new ObjectModel({
      name,
      description,
      imageUrl,
      user: req.user.id, // ID de l'utilisateur connecté
    });
    const savedObject = await newObject.save();
    res.status(201).json(savedObject);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'objet' });
  }
};

// Lister les objets d'un utilisateur
exports.getObjects = async (req, res) => {
  try {
    const objects = await ObjectModel.find({ user: req.user.id });
    res.status(200).json(objects);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des objets' });
  }
};

// Modifier un objet
exports.updateObject = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedObject = await ObjectModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedObject);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'objet' });
  }
};

// Supprimer un objet
exports.deleteObject = async (req, res) => {
  try {
    const { id } = req.params;
    await ObjectModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Objet supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'objet' });
  }
};
