package dao;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.transaction.annotation.Transactional;

import entities.Winner;
@Transactional
public class GameDAO {
	@PersistenceContext
	private EntityManager em;
	
	public List<Winner> getAllWinners(){
		TypedQuery<Winner> tq = em.createQuery("Select w from Winner w", Winner.class);
		List<Winner> winners = tq.getResultList();
		Collections.sort(winners, new Comparator(){

			@Override
			public int compare(Object o1, Object o2)
			{
				Winner w1 = (Winner) o1;
				Winner w2 = (Winner) o2;
				if(w1.getScore() < w2.getScore()){
					return 1;
				}else if(w1.getScore() > w2.getScore()){
					return -1;
				}
				else{
					return 0;
				}
			}
			  
		});
		return winners;
	}
	public Boolean addWinner(Winner winner){
		em.persist(winner);
		if(em.contains(winner)){
			return true;
		}
		return false;
	}

}
