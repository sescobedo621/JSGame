package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="winner")
public class Winner {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@Column(name="winner_name")
	private String winnerName;
	private int score;
	
	public Winner(){
		
	}
	
	public Winner(String winner, int score){
		this.winnerName = winner;
		this.score = score;
	}
	 
	public int getId()
	{
		return id;
	}
	
	public void setId(int id)
	{
		this.id = id;
	}
	
	public String getWinnerName()
	{
		return winnerName;
	}
	
	public void setWinnerName(String winnerName)
	{
		this.winnerName = winnerName;
	}
	
	public int getScore()
	{
		return score;
	}
	
	public void setScore(int score)
	{
		this.score = score;
	}

	@Override
	public String toString()
	{
		return "Winner [id=" + id + ", winnerName=" + winnerName + ", score=" + score + "]";
	}
	public int compareTo(Winner o2){
		if(this.score < o2.score){
			return 1;
		}else if(this.score > o2.score){
			return -1;
		}else{
			return 0;
		}
	}
}
