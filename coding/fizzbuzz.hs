main = print . join $ map fizzbuzz [1..50]
  where join = foldl1 (\ x y -> x ++ " " ++ y) 

fizzbuzz :: Int -> String
fizzbuzz i | i `mod` 15 == 0 = "fizzbuzz"
           | i `mod`  5 == 0 = "buzz"
           | i `mod`  3 == 0 = "fizz"
           | otherwise       = show i