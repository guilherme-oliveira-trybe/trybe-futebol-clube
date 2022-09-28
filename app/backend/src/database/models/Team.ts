import { Model, DataTypes } from 'sequelize';
import db from '.';

class Teams extends Model {
  public teamName!: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Team',
  tableName: 'teams',
  timestamps: false,
});

export default Teams;
