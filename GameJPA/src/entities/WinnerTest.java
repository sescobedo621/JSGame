package entities;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;

public class WinnerTest {
	public static void main(String[] args)
	{
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("gamePU");
		EntityManager em = emf.createEntityManager();
//		em.getTransaction().begin();
//		Winner winner = new Winner("SUCCESS", 10000);
//		System.out.println(em.contains(winner));
//		em.persist(winner);
//		em.getTransaction().commit();
//		System.out.println(em.contains(winner));
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
		for (Winner winner : winners) {
			System.out.println(winner);
		}
		
	}
}
