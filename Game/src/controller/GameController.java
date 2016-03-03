package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import dao.GameDAO;
import entities.Winner;

@Controller
public class GameController {
	@Autowired
	GameDAO gameDao;
	
	@ResponseBody
	@RequestMapping("ping")
	public String ping(){
		return "pong";
	}
	@ResponseBody
	@RequestMapping(path="winners", method=RequestMethod.GET)
	public List<Winner> getWinners(){
		return gameDao.getAllWinners();
	}
	
	@ResponseBody
	@RequestMapping(path="addWinner", method=RequestMethod.PUT)
	public Boolean addWinner(@RequestBody Winner winner){
		return gameDao.addWinner(winner);
	}
}
