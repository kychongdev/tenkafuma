import { initCharacterState } from '@/placeholder/team';
import { GameState } from '../GameState';

export function wood(gameState: GameState) {
  gameState.enemies = [
    { ...initCharacterState, id: 'wood', maxHp: 5063653034, hp: 5063653034 },
  ];
}

export function wood_action(gameState: GameState) {}
