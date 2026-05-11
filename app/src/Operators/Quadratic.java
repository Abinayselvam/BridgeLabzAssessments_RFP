package Operators;

import java.util.Scanner;

public class Quadratic {
    public static void main(String[] args)
    {
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter a:");
        double a=sc.nextDouble();
        System.out.println("Enter b:");
        double b=sc.nextDouble();
        System.out.println("Enter c");
        double c=sc.nextDouble();

        //Check if it's actually a quadratic equation
        if(a==0)
        {
            System.out.println("This is not a quadratic equation a should not be 0");
            return;
        }
        double delta= b*b-4*a*c;
        if(delta>=0)
        {
            double root1 = (-b + Math.sqrt(delta)) / (2 * a);
            double root2 = (-b - Math.sqrt(delta)) / (2 * a);

            System.out.println("Two real and distinct roots:");
            System.out.println("Root 1 = " + root1);
            System.out.println("Root 2 = " + root2);
        }
        else if (delta==0)
        {
            double root = -b / (2 * a);

            System.out.println("One real root (repeated):");
            System.out.println("Root = " + root);

        }
        else
        {
            // Complex roots
            double realPart = -b / (2 * a);
            double imaginaryPart = Math.sqrt(-delta) / (2 * a);

            System.out.println("Complex roots:");
            System.out.println("Root 1 = " + realPart + " + " + imaginaryPart + "i");
            System.out.println("Root 2 = " + realPart + " - " + imaginaryPart + "i");
        }
        sc.close();

    }
}